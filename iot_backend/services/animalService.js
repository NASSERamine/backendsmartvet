const { db } = require("../config/firebaseConfig"); // Importer la config Firebase

// Fonction pour ajouter un animal
const addAnimal = async (animalId, name, age, type) => {
  try {
    const ref = db.ref("animals"); // Référence dans la base de données
    const animalRef = ref.child(animalId); // Référence de l'animal spécifique

    // Ajouter un animal dans la base de données
    await animalRef.set({
      name: name,
      age: age,
      type: type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(), // Date de mise à jour
    });

    return { message: "Animal ajouté avec succès !" };
  } catch (error) {
    throw new Error("Erreur lors de l'ajout de l'animal : " + error.message);
  }
};

// Fonction pour récupérer un animal par son ID
const getAnimalById = async (animalId) => {
  try {
    const ref = db.ref("animals");
    const snapshot = await ref.child(animalId).once("value");
    const data = snapshot.val();

    if (!data) {
      throw new Error("Animal non trouvé");
    }

    return data;
  } catch (error) {
    throw new Error(
      "Erreur lors de la récupération de l'animal : " + error.message
    );
  }
};

// Fonction pour mettre à jour un animal
const updateAnimal = async (animalId, name, age, type) => {
  try {
    const ref = db.ref("animals");
    const animalRef = ref.child(animalId);

    // Mettre à jour l'animal dans la base de données
    await animalRef.update({
      name: name,
      age: age,
      type: type,
      updatedAt: new Date().toISOString(), // Date de mise à jour
    });

    return { message: "Animal mis à jour avec succès !" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour de l'animal : " + error.message
    );
  }
};

// Fonction pour supprimer un animal
const deleteAnimal = async (animalId) => {
  try {
    const ref = db.ref("animals");
    const animalRef = ref.child(animalId);

    // Supprimer l'animal dans la base de données
    await animalRef.remove();

    return { message: "Animal supprimé avec succès !" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la suppression de l'animal : " + error.message
    );
  }
};

module.exports = { addAnimal, getAnimalById, updateAnimal, deleteAnimal };
