const express = require("express");
const {
  createMedication,
  getMedication,
  updateMedicationInfo,
  removeMedication,
  getAllMedicationsHandler
} = require("../Controllers/medicationController");

const router = express.Router();

// Ajouter un médicament
router.post("/medications", createMedication);

// Récupérer un médicament par ID
router.get("/medications/:medicationId", getMedication);

// Mettre à jour un médicament
router.put("/medications/:medicationId", updateMedicationInfo);

// get all 
router.get("/medications", getAllMedicationsHandler);

// Supprimer un médicament
router.delete("/medications/:medicationId", removeMedication);

module.exports = router;
