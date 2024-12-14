const { db } = require("../config/firebaseConfig"); // Importer la config Firebase

// Fonction pour ajouter un animal
const addAnimal = async (name, age, type, weight) => {
  try {
    const ref = db.ref("animals"); // Référence dans la base de données
    const newAnimalRef = ref.push(); // Générer un ID unique

    const animalId = newAnimalRef.key; // Récupérer l'ID généré
    const animalData = {
      id: animalId,
      name: name,
      age: age,
      type: type,
      weight: weight,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Ajouter un animal dans la base de données
    await newAnimalRef.set(animalData);

    return { message: "Animal ajouté avec succès !", data: animalData };
  } catch (error) {
    throw new Error("Erreur lors de l'ajout de l'animal : " + error.message);
  }
};

// Autres fonctions (inchangées)
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

const updateAnimal = async (animalId, name, age, type, weight) => {
  try {
    const ref = db.ref("animals");
    const animalRef = ref.child(animalId);

    await animalRef.update({
      name: name,
      age: age,
      type: type,
      weight: weight,
      updatedAt: new Date().toISOString(),
    });

    return { message: "Animal mis à jour avec succès !" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour de l'animal : " + error.message
    );
  }
};

const deleteAnimal = async (animalId) => {
  try {
    const ref = db.ref("animals");
    const animalRef = ref.child(animalId);

    await animalRef.remove();

    return { message: "Animal supprimé avec succès !" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la suppression de l'animal : " + error.message
    );
  }
};

module.exports = { addAnimal, getAnimalById, updateAnimal, deleteAnimal };
