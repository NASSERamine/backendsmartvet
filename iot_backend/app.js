const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./utils/loggers");
const dataRoutes = require("./routes/dataRoutes");
const authRoutes = require("./routes/authRoutes");
const animalRoutes = require("./routes/animalRoutes");
const chatbotRoutes = require("./routes/dialogflowRoutes");
const medicationRoutes = require("./routes/medicationRoutes");

const { syncDataToFirebase } = require("./controllers/dataController");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", dataRoutes);
app.use("/api", authRoutes);
app.use("/api", animalRoutes);
app.use("/api",medicationRoutes);

app.use("/api/chatbot", chatbotRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: "Erreur interne du serveur." });
});

// Planification pour synchroniser automatiquement les données toutes les 10 secondes
setInterval(async () => {
  try {
    await syncDataToFirebase(); // Appel direct sans `req` ni `res`
  } catch (error) {
    console.error(
      "Erreur lors de la synchronisation automatique :",
      error.message
    );
  }
}, 10000); // Toutes les 10 secondes

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
