const { registerUser, loginUser ,getNameByEmail} = require("../services/authService");

// Inscription d'un utilisateur
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Vérifier si les données nécessaires sont présentes
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Le nom, l'email et le mot de passe sont requis." });
  }

  try {
    const user = await registerUser(name, email, password);
    res.status(201).json({
      message: "Utilisateur inscrit avec succès",
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur d'inscription", error: error.message });
  }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'email et le mot de passe sont présents
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "L'email et le mot de passe sont requis." });
  }

  try {
    const user = await loginUser(email, password);
    res.status(200).json({
      message: "Connexion réussie",
      user: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur de connexion", error: error.message });
  }
};

const NameByEmail = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: "L'email est requis." });
  }

  try {
    const userName = await getNameByEmail(email);
    if (!userName) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ name: userName });
  } catch (error) {
    res.status(500).json({ message: "Erreur de récupération du nom", error: error.message });
  }
};


module.exports = { register, login ,NameByEmail};
