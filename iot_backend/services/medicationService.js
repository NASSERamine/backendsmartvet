const { db } = require("../config/firebaseConfig"); // Importer la config Firebase

// Fonction pour ajouter un médicament
const addMedication = async (name, details) => {
  try {
    const ref = db.ref("medications"); // Référence dans la base de données
    const newMedicationRef = ref.push(); // Générer un ID unique
    const medicationId = newMedicationRef.key; // Récupérer l'ID généré

    const medicationData = {
      id: medicationId,
      name: name,
      details: details,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Ajouter le médicament dans la base de données
    await newMedicationRef.set(medicationData);

    return { message: "Médicament ajouté avec succès !", data: medicationData };
  } catch (error) {
    throw new Error("Erreur lors de l'ajout du médicament : " + error.message);
  }
};

// Fonction pour récupérer un médicament par ID
const getMedicationById = async (medicationId) => {
  try {
    const ref = db.ref("medications");
    const snapshot = await ref.child(medicationId).once("value");
    const data = snapshot.val();

    if (!data) {
      throw new Error("Médicament non trouvé");
    }

    return data;
  } catch (error) {
    throw new Error(
      "Erreur lors de la récupération du médicament : " + error.message
    );
  }
};

// Fonction pour mettre à jour un médicament
const updateMedication = async (medicationId, name, details) => {
  try {
    const ref = db.ref("medications");
    const medicationRef = ref.child(medicationId);

    await medicationRef.update({
      name: name,
      details: details,
      updatedAt: new Date().toISOString(),
    });

    return { message: "Médicament mis à jour avec succès !" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la mise à jour du médicament : " + error.message
    );
  }
};

// Fonction pour supprimer un médicament
const deleteMedication = async (medicationId) => {
  try {
    const ref = db.ref("medications");
    const medicationRef = ref.child(medicationId);

    await medicationRef.remove();

    return { message: "Médicament supprimé avec succès !" };
  } catch (error) {
    throw new Error(
      "Erreur lors de la suppression du médicament : " + error.message
    );
  }
};
const getAllMedications = async () => {
  try {
    const ref = db.ref("medications");
    const snapshot = await ref.once("value");
    const medications = snapshot.val();

    if (!medications) {
      return [];
    }

    // Convertir l'objet des médicaments en tableau
    return Object.keys(medications).map(key => ({
      id: key,
      ...medications[key]
    }));
  } catch (error) {
    throw new Error("Erreur lors de la récupération des médicaments : " + error.message);
  }
};

module.exports = { addMedication, getMedicationById, updateMedication, deleteMedication,getAllMedications };
