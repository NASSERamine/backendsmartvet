const db = require("./config/firebaseConfig");

function initializeSocket(io) {
  const sensorDataRef = db.ref("sensorData");

  // Écouter les nouveaux ajouts dans la base de données
  sensorDataRef.limitToLast(1).on("child_added", (snapshot) => {
    const data = snapshot.val();
    console.log("Nouvelle donnée détectée :", data);

    // Diffuser les données en temps réel à tous les clients connectés
    io.emit("sensorData", data);
  });

  console.log("Socket.IO initialisé et connecté à Firebase.");
}

module.exports = { initializeSocket };
