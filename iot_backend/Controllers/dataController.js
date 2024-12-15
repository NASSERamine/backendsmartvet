const { db } = require("../config/firebaseConfig");
const { fetchThingSpeakData } = require("../services/thingSpeakService");

// Fonction pour synchroniser les données avec Firebase
async function syncDataToFirebase(req, res) {
  try {
    const entry = await fetchThingSpeakData();
    if (!entry) {
      return res.status(204).json({ message: "Aucune nouvelle donnée disponible." });
    }

    const ref = db.ref("sensorData");
    const entryRef = ref.child(entry.entry_id.toString());

    await entryRef.set({
      timestamp: entry.created_at || null,
      temperature: entry.field2 ? parseFloat(entry.field2) : null,
      movement: entry.field4 ? parseFloat(entry.field4) : null,
      pulseValue: entry.field3 ? parseFloat(entry.field3) : null,
    });

    res.status(200).json({ message: "Données synchronisées avec succès.", entry });
  } catch (error) {
    console.error("Erreur lors de la synchronisation :", error.message);
    res.status(500).json({ error: "Erreur serveur lors de la synchronisation." });
  }
}

// Fonction générique pour récupérer les données depuis Firebase
async function getLatestSensorData(req, res, field) {
  try {
    const ref = db.ref("sensorData");
    const snapshot = await ref.orderByChild("timestamp").limitToLast(1).once("value");
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ message: `Aucune donnée trouvée pour ${field}.` });
    }

    const [key, value] = Object.entries(data).pop();

    // Vérifier si le champ existe
    if (!value[field]) {
      return res.status(404).json({ message: `Le champ ${field} est introuvable.` });
    }

    res.status(200).json({ [field]: value[field], timestamp: value.timestamp });
  } catch (error) {
    console.error(`Erreur lors de la récupération de ${field} :`, error.message);
    res.status(500).json({ error: `Erreur serveur lors de la récupération de ${field}.` });
  }
}

// Fonctions spécifiques basées sur le champ
async function getTemperature(req, res) {
  return getLatestSensorData(req, res, "temperature");
}

async function getMovement(req, res) {
  return getLatestSensorData(req, res, "movement");
}

async function getPulseValue(req, res) {
  return getLatestSensorData(req, res, "pulseValue");
}
async function getSensorHistory(req, res) {
  try {
    const ref = db.ref("sensorData");
    const snapshot = await ref.orderByChild("timestamp").once("value");
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ message: "Aucune donnée trouvée." });
    }

    const history = Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value,
    }));

    res.status(200).json(history);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique :", error.message);
    res.status(500).json({ error: "Erreur serveur lors de la récupération de l'historique." });
  }
}
module.exports = {
  syncDataToFirebase,
  getTemperature,
  getMovement,
  getPulseValue,
  getSensorHistory,
};
