const axios = require("axios");

const channelId = "2759038"; // Votre Channel ID
const readApiKey = "DJI56H77HGEFKNLH"; // Votre Read API Key
const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${readApiKey}&results=1`;

// Fonction pour récupérer les données depuis ThingSpeak
async function fetchThingSpeakData() {
  try {
    const response = await axios.get(url);
    const feeds = response.data.feeds;

    if (!feeds || feeds.length === 0) {
      console.log("Aucune nouvelle donnée trouvée dans le canal ThingSpeak.");
      return null;
    }

    return feeds[0]; // Retourne la dernière entrée
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données ThingSpeak :",
      error.message
    );
    throw new Error("Échec de la récupération des données.");
  }
}

module.exports = { fetchThingSpeakData };
