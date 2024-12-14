const express = require("express");
const { register, login,NameByEmail } = require("../controllers/authController");
const { route } = require("./dataRoutes");


const router = express.Router();

// Route pour inscrire un utilisateur
router.post("/register", register);

// Route pour connecter un utilisateur
router.post("/login", login);

router.get("/username/:email",NameByEmail)

module.exports = router;
