const { sendNotification } = require('../services/notificationService');

const normalRanges = {
  cat: {
    temperature: { min: 38, max: 39.2 },
    pulse: { min: 400, max: 700 },
    movement: { min: 0, max: 12 }
  },
  dog: {
    temperature: { min: 38.3, max: 39.2 },
    pulse: { min: 400, max: 800 },
    movement: { min: 0, max: 12 }
  }
};

function checkAbnormalValues(animalType, data) {
  const abnormalValues = [];
  const range = normalRanges[animalType];
  let notificationIndex = 0;

  if (data.temperature < range.temperature.min || data.temperature > range.temperature.max) {
    abnormalValues.push(`Temperature: ${data.temperature}`);
    notificationIndex += 1;
  }

  if (data.pulseValue < range.pulse.min || data.pulseValue > range.pulse.max) {
    abnormalValues.push(`Pulse: ${data.pulseValue}`);
    notificationIndex += 2;
  }

  if (data.movement < range.movement.min || data.movement > range.movement.max) {
    abnormalValues.push(`Movement: ${data.movement}`);
    notificationIndex += 4;
  }

  return { abnormalValues, notificationIndex };
}

exports.handleNotifications = async (animalType, data) => {
  const { abnormalValues, notificationIndex } = checkAbnormalValues(animalType, data);

  if (abnormalValues.length > 0) {
    const message = `Abnormal values detected for ${animalType}: ${abnormalValues.join(', ')}`;
    await sendNotification(message, notificationIndex, animalType);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await sendNotification.getNotifications();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearNotifications = async (req, res) => {
  try {
    await sendNotification.clearNotifications();
    res.json({ message: 'Notifications cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

