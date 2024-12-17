const { registerUser, loginUser, getNameByEmail } = require("../services/authService");

// Inscription
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await registerUser(name, email, password);
    res.status(201).json({ message: "Utilisateur inscrit avec succès", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Connexion
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    res.status(200).json({ message: "Connexion réussie", user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Obtenir le nom de l'utilisateur par email
const NameByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const name = await getNameByEmail(email);
    res.status(200).json({ name });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { register, login, NameByEmail };
