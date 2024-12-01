const admin = require("firebase-admin");

// Empêche les conflits d'initialisation
if (!admin.apps.length) {
  const serviceAccount = require("../smartvet-7102f-firebase-adminsdk-66si7-1dcd852ea7.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://smartvet-7102f-default-rtdb.firebaseio.com/",
  });
}

// Export des instances
module.exports = {
  db: admin.database(),
  auth: admin.auth(),
};
