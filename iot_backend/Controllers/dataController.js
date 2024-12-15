const { db } = require("../config/firebaseConfig");
const { fetchThingSpeakData } = require("../services/thingSpeakService");

// Seuils normaux
const THRESHOLDS = {
  temperature: { min: 38.3, max: 39.2 },
  pulse: { min: 400, max: 800 },
  movement: { min: 0, max: 12 },
};

// Fonction pour synchroniser les données avec Firebase
async function syncDataToFirebase(req, res) {
  try {
    const entry = await fetchThingSpeakData();
    if (!entry) {
      return res.status(204).json({ message: "Aucune nouvelle donnée disponible." });
    }

    const ref = db.ref("sensorData");
    const entryRef = ref.child(entry.entry_id.toString());

    const sensorData = {
      timestamp: entry.created_at || null,
      temperature: entry.field2 ? parseFloat(entry.field2) : null,
      movement: entry.field4 ? parseFloat(entry.field4) : null,
      pulseValue: entry.field3 ? parseFloat(entry.field3) : null,
    };

    // Vérification des valeurs et création des notifications
    const alerts = [];
    if (sensorData.temperature < THRESHOLDS.temperature.min || sensorData.temperature > THRESHOLDS.temperature.max) {
      alerts.push(`Température anormale: ${sensorData.temperature}°C`);
    }
    if (sensorData.pulseValue < THRESHOLDS.pulse.min || sensorData.pulseValue > THRESHOLDS.pulse.max) {
      alerts.push(`Pouls anormal: ${sensorData.pulseValue}`);
    }
    if (sensorData.movement < THRESHOLDS.movement.min || sensorData.movement > THRESHOLDS.movement.max) {
      alerts.push(`Mouvement anormal: ${sensorData.movement}`);
    }

    // Enregistrement des données dans Firebase
    await entryRef.set(sensorData);

    // Ajouter des notifications dans Firebase si des alertes sont détectées
    if (alerts.length > 0) {
      const notificationsRef = db.ref("notifications");
      const timestamp = new Date().toISOString();

      for (const alert of alerts) {
        await notificationsRef.push({
          message: alert,
          timestamp,
          sensorData,
        });
      }
    }

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
async function getNotifications(req, res) {
  try {
    const ref = db.ref("notifications");
    const snapshot = await ref.orderByChild("timestamp").once("value");
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ message: "Aucune notification trouvée." });
    }

    // Transformez les données en tableau
    const notifications = Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
    }));

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error.message);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des notifications." });
  }
}

module.exports = {
  syncDataToFirebase,
  getTemperature,
  getMovement,
  getPulseValue,
  getSensorHistory,
  getNotifications
};
