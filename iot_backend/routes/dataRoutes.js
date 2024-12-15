const express = require("express");
const {
  syncDataToFirebase,
  getTemperature,
  getMovement,
  getPulseValue,
  getSensorHistory
} = require("../controllers/dataController");

const router = express.Router();

// Route pour synchroniser les données en temps réel
router.get("/sync", syncDataToFirebase);

// Routes pour récupérer des données spécifiques
router.get("/temperature", getTemperature);
router.get("/movement", getMovement);
router.get("/pulse", getPulseValue);
router.get("/history", getSensorHistory);


module.exports = router;
