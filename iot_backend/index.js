const admin = require("firebase-admin");
const axios = require("axios"); // Pour faire des requêtes HTTP

// Charger la clé de service Firebase
const serviceAccount = require("./smartvet-7102f-firebase-adminsdk-66si7-1dcd852ea7.json");

// Initialiser Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smartvet-7102f-default-rtdb.firebaseio.com/", // Remplacez par l'URL correcte de votre Firebase Realtime Database
});

// Référence à Firebase Realtime Database
const db = admin.database();

// Configuration de ThingSpeak
const channelId = "2759038"; // Votre Channel ID
const readApiKey = "DJI56H77HGEFKNLH"; // Votre Read API Key
const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${readApiKey}&results=1`; // Récupérer seulement le dernier résultat

// Fonction pour récupérer les données de ThingSpeak et les stocker dans Firebase
async function fetchDataAndStore() {
  try {
    // Étape 1 : Récupérer les données de ThingSpeak
    const response = await axios.get(url);
    const feeds = response.data.feeds;

    if (!feeds || feeds.length === 0) {
      console.log("Aucune nouvelle donnée trouvée dans le canal ThingSpeak.");
      return;
    }

    // Étape 2 : Référence vers Firebase
    const ref = db.ref("sensorData"); // Créez un noeud 'sensorData' dans Firebase

    // Étape 3 : Ajouter la dernière entrée dans Firebase
    const entry = feeds[0];
    const entryRef = ref.child(entry.entry_id.toString()); // Utiliser entry_id pour une clé unique
    await entryRef.set({
      timestamp: entry.created_at, // Date et heure de la lecture
      Température: entry.field2 || null, // Température de l'objet
      pulseValue: entry.field3 || null, // Valeur du capteur KY-039
      Mouvement: entry.field4 || null, // État du mouvement
    });

    console.log(`Nouvelle entrée enregistrée dans Firebase : ${entry.entry_id}`);
  } catch (error) {
    // Gestion des erreurs
    console.error("Erreur lors de la récupération ou de l'enregistrement des données :", error.message);
  }
}

// Planification pour un fonctionnement en temps réel
function startRealTimeSync(interval = 5000) {
  console.log(`Démarrage de la synchronisation en temps réel avec un intervalle de ${interval} ms...`);
  setInterval(fetchDataAndStore, interval); // Appelle fetchDataAndStore toutes les 5000ms (5 secondes)
}

// Démarrer le processus en temps réel
startRealTimeSync();
