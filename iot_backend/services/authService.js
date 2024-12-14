const { auth, db } = require("../config/firebaseConfig.js"); // Assurez-vous que db est bien importé aussi

// Inscription de l'utilisateur avec email, nom et mot de passe
const registerUser = async (name, email, password) => {
  try {
    // Créer un utilisateur dans Firebase Authentication
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name, // Stocker le nom dans les informations de l'utilisateur
    });

    // Ajouter l'utilisateur dans Firebase Realtime Database
    const userRef = db.ref("users/" + userRecord.uid); // Stocker l'ID utilisateur dans la base de données
    await userRef.set({
      name: userRecord.displayName, // Le nom de l'utilisateur
      email: userRecord.email,
      uid: userRecord.uid,
      createdAt: new Date().toISOString(),
    });

    // Retourner l'utilisateur créé
    return userRecord;
  } catch (error) {
    throw new Error("Erreur lors de l'inscription: " + error.message);
  }
};

// Connexion de l'utilisateur (dans Firebase Authentication, mais le mot de passe est vérifié côté client)
const loginUser = async (email, password) => {
  try {
    // Firebase Authentication utilise les mots de passe pour l'authentification
    const user = await auth.getUserByEmail(email);
    if (!user) throw new Error("Utilisateur non trouvé");

    // Retourner les informations de l'utilisateur (sans authentifier par mot de passe côté backend)
    return user;
  } catch (error) {
    throw new Error("Erreur lors de la connexion: " + error.message);
  }
};

// Get user name by email
const getNameByEmail = async (email) => {
  try {
    // Fetch user information by email from Firebase Authentication
    const user = await auth.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    // Return the display name of the user
    return user.displayName;
  } catch (error) {
    throw new Error("Error retrieving user name: " + error.message);
  }
};

module.exports = { registerUser, loginUser ,getNameByEmail };
