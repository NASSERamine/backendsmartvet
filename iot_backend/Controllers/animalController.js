const {
  addAnimal,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} = require("../services/animalService");

// Ajouter un animal
const createAnimal = async (req, res) => {
  const { name, age, type, weight } = req.body;

  // Vérifier que les informations nécessaires sont présentes
  if ( !name || !age || !type || weight === undefined) {
    return res.status(400).json({
      message:
        "L'animal doit avoir un ID, un nom, un âge, un type et un poids.",
    });
  }

  try {
    const result = await addAnimal( name, age, type, weight);
    res.status(201).json(result);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'animal:", error.message);
    res.status(500).json({
      message: "Erreur serveur lors de l'ajout de l'animal.",
      error: error.message,
    });
  }
};

// Récupérer un animal par ID
const getAnimal = async (req, res) => {
  const { animalId } = req.params;

  try {
    const animal = await getAnimalById(animalId);
    if (!animal) {
      return res.status(404).json({ message: "Animal non trouvé." });
    }
    res.status(200).json(animal);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'animal:", error.message);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'animal.",
      error: error.message,
    });
  }
};

// Mettre à jour un animal
const updateAnimalInfo = async (req, res) => {
  const { animalId } = req.params;
  const { name, age, type, weight } = req.body;

  // Vérifier que les informations nécessaires sont présentes
  if (!name || !age || !type || weight === undefined) {
    return res.status(400).json({
      message:
        "Le nom, l'âge, le type et le poids sont requis pour la mise à jour.",
    });
  }

  try {
    const result = await updateAnimal(animalId, name, age, type, weight);
    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'animal:", error.message);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour de l'animal.",
      error: error.message,
    });
  }
};

// Supprimer un animal
const removeAnimal = async (req, res) => {
  const { animalId } = req.params;

  try {
    const result = await deleteAnimal(animalId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'animal:", error.message);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de l'animal.",
      error: error.message,
    });
  }
};

module.exports = { createAnimal, getAnimal, updateAnimalInfo, removeAnimal };
