const { db } = require("../config/firebaseConfig");

const { fetchThingSpeakData } = require("../services/thingSpeakService");

// Fonction pour synchroniser les données avec Firebase
async function syncDataToFirebase(req, res) {
  try {
    const entry = await fetchThingSpeakData();
    if (!entry) {
      return res
        ?.status(204)
        .json({ message: "Aucune nouvelle donnée disponible." });
    }

    const ref = db.ref("sensorData");
    const entryRef = ref.child(entry.entry_id.toString());

    await entryRef.set({
      timestamp: entry.created_at,
      temperature: entry.field2 || null,
      movement: entry.field4 || null,
      pulseValue: entry.field3 || null,
    });

    res
      ?.status(200)
      .json({ message: "Données synchronisées avec succès.", entry });
  } catch (error) {
    console.error("Erreur lors de la synchronisation :", error.message);
    res
      ?.status(500)
      .json({ error: "Erreur serveur lors de la synchronisation." });
  }
}

// Fonction pour récupérer la température depuis Firebase
async function getTemperature(req, res) {
  try {
    const ref = db.ref("sensorData");
    const snapshot = await ref
      .orderByChild("timestamp")
      .limitToLast(1)
      .once("value");
    const data = snapshot.val();

    if (!data) {
      return res
        .status(404)
        .json({ message: "Aucune donnée de température trouvée." });
    }

    const [key, value] = Object.entries(data).pop();
    res.status(200).json({ temperature: value.temperature });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la température :",
      error.message
    );
    res
      .status(500)
      .json({
        error: "Erreur serveur lors de la récupération de la température.",
      });
  }
}

// Fonction pour récupérer les mouvements depuis Firebase
async function getMovement(req, res) {
  try {
    const ref = db.ref("sensorData");
    const snapshot = await ref
      .orderByChild("timestamp")
      .limitToLast(1)
      .once("value");
    const data = snapshot.val();

    if (!data) {
      return res
        .status(404)
        .json({ message: "Aucune donnée de mouvement trouvée." });
    }

    const [key, value] = Object.entries(data).pop();
    res.status(200).json({ movement: value.movement });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des mouvements :",
      error.message
    );
    res
      .status(500)
      .json({
        error: "Erreur serveur lors de la récupération des mouvements.",
      });
  }
}

// Fonction pour récupérer les pulsations cardiaques depuis Firebase
async function getPulseValue(req, res) {
  try {
    const ref = db.ref("sensorData");
    const snapshot = await ref
      .orderByChild("timestamp")
      .limitToLast(1)
      .once("value");
    const data = snapshot.val();

    if (!data) {
      return res
        .status(404)
        .json({ message: "Aucune donnée de pulsation trouvée." });
    }

    const [key, value] = Object.entries(data).pop();
    res.status(200).json({ pulseValue: value.pulseValue });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des pulsations :",
      error.message
    );
    res
      .status(500)
      .json({
        error: "Erreur serveur lors de la récupération des pulsations.",
      });
  }
}

module.exports = {
  syncDataToFirebase,
  getTemperature,
  getMovement,
  getPulseValue,
};
