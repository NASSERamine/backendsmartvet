const {
    addMedication,
    getMedicationById,
    updateMedication,
    deleteMedication,
    getAllMedications
  } = require("../services/medicationService");
  
  // Ajouter un médicament (Create)
  const createMedication = async (req, res) => {
    const { name, details } = req.body;
  
    if (!name || !details) {
      return res.status(400).json({
        message: "Le médicament doit avoir un nom et des détails.",
      });
    }
  
    try {
      const result = await addMedication(name, details);
      res.status(201).json({
        message: "Médicament ajouté avec succès.",
        data: result.data, // Inclure les données du médicament (y compris l'ID généré)
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du médicament:", error.message);
      res.status(500).json({
        message: "Erreur serveur lors de l'ajout du médicament.",
        error: error.message,
      });
    }
  };
  
  // Récupérer un médicament par ID
  const getMedication = async (req, res) => {
    const { medicationId } = req.params;
  
    try {
      const medication = await getMedicationById(medicationId);
      if (!medication) {
        return res.status(404).json({ message: "Médicament non trouvé." });
      }
      res.status(200).json(medication);
    } catch (error) {
      console.error("Erreur lors de la récupération du médicament:", error.message);
      res.status(500).json({
        message: "Erreur serveur lors de la récupération du médicament.",
        error: error.message,
      });
    }
  };
  
  // Mettre à jour un médicament
  const updateMedicationInfo = async (req, res) => {
    const { medicationId } = req.params;
    const { name, details } = req.body;
  
    if (!name || !details) {
      return res.status(400).json({
        message: "Le nom et les détails du médicament sont requis pour la mise à jour.",
      });
    }
  
    try {
      const result = await updateMedication(medicationId, name, details);
      res.status(200).json({
        message: "Médicament mis à jour avec succès.",
        data: result,
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du médicament:", error.message);
      res.status(500).json({
        message: "Erreur serveur lors de la mise à jour du médicament.",
        error: error.message,
      });
    }
  };
  
  // Supprimer un médicament
  const removeMedication = async (req, res) => {
    const { medicationId } = req.params;
  
    try {
      const result = await deleteMedication(medicationId);
      res.status(200).json({
        message: "Médicament supprimé avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du médicament:", error.message);
      res.status(500).json({
        message: "Erreur serveur lors de la suppression du médicament.",
        error: error.message,
      });
    }
  };
  const getAllMedicationsHandler = async (req, res) => {
    try {
      const medications = await getAllMedications();
      res.status(200).json(medications);
    } catch (error) {
      console.error("Erreur lors de la récupération des médicaments:", error.message);
      res.status(500).json({
        message: "Erreur serveur lors de la récupération des médicaments.",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    createMedication,
    getMedication,
    updateMedicationInfo,
    removeMedication,
    getAllMedicationsHandler
  };
  