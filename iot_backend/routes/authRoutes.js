const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Route pour inscrire un utilisateur
router.post("/register", register);

// Route pour connecter un utilisateur
router.post("/login", login);

module.exports = router;
