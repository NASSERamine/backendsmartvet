const { 
  addAnimal, 
  getAnimalById, 
  updateAnimal, 
  deleteAnimal, 
  getAnimalsByEmail 
} = require("../services/animalService");

// Ajouter un animal
const createAnimal = async (req, res) => {
  const { name, age, type, weight, email } = req.body;

  try {
    const result = await addAnimal(name, age, type, weight, email);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de l'animal", error: error.message });
  }
};

// Récupérer un animal par ID
const getAnimal = async (req, res) => {
  const animalId = req.params.animalId;

  try {
    const animal = await getAnimalById(animalId);
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'animal", error: error.message });
  }
};

// Mettre à jour un animal
const updateAnimalInfo = async (req, res) => {
  const animalId = req.params.animalId;
  const { name, age, type, weight } = req.body;

  try {
    const result = await updateAnimal(animalId, name, age, type, weight);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'animal", error: error.message });
  }
};

// Supprimer un animal
const removeAnimal = async (req, res) => {
  const animalId = req.params.animalId;

  try {
    const result = await deleteAnimal(animalId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'animal", error: error.message });
  }
};

// Récupérer les animaux par email
const getAnimalsByUserEmail = async (req, res) => {
  const email = req.query.email; // Email reçu en tant que paramètre de requête

  if (!email) {
    return res.status(400).json({ message: "L'email est requis" });
  }

  try {
    const animals = await getAnimalsByEmail(email);
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des animaux", error: error.message });
  }
};

module.exports = { 
  createAnimal, 
  getAnimal, 
  updateAnimalInfo, 
  removeAnimal, 
  getAnimalsByUserEmail 
};
