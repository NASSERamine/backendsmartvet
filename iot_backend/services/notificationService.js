const notifications = [];

exports.sendNotification = async (message, notificationIndex, animalType) => {
  const notification = {
    message,
    notificationIndex,
    animalType,
    timestamp: new Date().toISOString()
  };
  notifications.push(notification);
  console.log('NOTIFICATION:', notification);
};

exports.getNotifications = () => {
  return notifications;
};

exports.clearNotifications = () => {
  notifications.length = 0;
};

