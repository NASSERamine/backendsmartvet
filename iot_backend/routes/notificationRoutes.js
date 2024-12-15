const express = require('express');
const { getNotifications, clearNotifications } = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/notifications', verifyToken, getNotifications);
router.delete('/notifications', verifyToken, clearNotifications);

module.exports = router;

