const express = require("express");
const {
  createAnimal,
  getAnimal,
  updateAnimalInfo,
  removeAnimal,
} = require("../controllers/animalController");
const router = express.Router();

// Ajouter un animal
router.post("/animals", createAnimal);

// Récupérer un animal par ID
router.get("/animals/:animalId", getAnimal);

// Mettre à jour un animal
router.put("/animals/:animalId", updateAnimalInfo);

// Supprimer un animal
router.delete("/animals/:animalId", removeAnimal);

module.exports = router;
