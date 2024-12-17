const bcrypt = require('bcryptjs');
const { auth, db } = require("../config/firebaseConfig.js");

// Inscription de l'utilisateur avec email, nom et mot de passe
const registerUser = async (name, email, password) => {
  try {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un utilisateur dans Firebase Authentication
    const userRecord = await auth.createUser({
      email: email,
      password: hashedPassword, // Enregistre un mot de passe haché
      displayName: name,
    });

    // Ajouter l'utilisateur dans Firebase Realtime Database
    const userRef = db.ref("users/" + userRecord.uid);
    await userRef.set({
      name: userRecord.displayName,
      email: userRecord.email,
      uid: userRecord.uid,
      password: hashedPassword, // Enregistre le mot de passe haché dans la base de données
      createdAt: new Date().toISOString(),
    });

    return userRecord;
  } catch (error) {
    throw new Error("Erreur lors de l'inscription: " + error.message);
  }
};

// Connexion de l'utilisateur avec vérification du mot de passe
const loginUser = async (email, password) => {
  try {
    // Récupérer l'utilisateur par email
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) throw new Error("Utilisateur non trouvé");

    // Récupérer l'utilisateur dans la base de données pour accéder au mot de passe haché
    const userRef = db.ref("users/" + userRecord.uid);
    const userSnapshot = await userRef.once("value");
    const userData = userSnapshot.val();

    if (!userData) throw new Error("Utilisateur non trouvé dans la base de données");

    // Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) throw new Error("Mot de passe incorrect");

    // Retourner les informations de l'utilisateur
    return {
      uid: userRecord.uid,
      name: userRecord.displayName,
      email: userRecord.email,
    };
  } catch (error) {
    throw new Error("Erreur lors de la connexion: " + error.message);
  }
};

// Get user name by email
const getNameByEmail = async (email) => {
  try {
    const user = await auth.getUserByEmail(email);
    if (!user) throw new Error("User not found");
    return user.displayName;
  } catch (error) {
    throw new Error("Error retrieving user name: " + error.message);
  }
};

module.exports = { registerUser, loginUser, getNameByEmail };
