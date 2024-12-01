const dialogflow = require("@google-cloud/dialogflow");
const path = require("path");

// Chemin vers le fichier de clé JSON
const keyPath = path.join(__dirname, "../smartvet-rfnx-e60f9fac5fa1.json");
const sessionClient = new dialogflow.SessionsClient({ keyFilename: keyPath });
const projectId = "smartvet-rfnx";

// Fonction pour traiter un message avec Dialogflow
async function processMessage(message, sessionId) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en",
      },
    },
  };

  const [response] = await sessionClient.detectIntent(request);
  const result = response.queryResult;

  return {
    response: result.fulfillmentText,
    intent: result.intent.displayName,
    parameters: result.parameters,
  };
}

module.exports = { processMessage };
