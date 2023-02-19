const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return <div className={notification.style}>{notification.message}</div>;
};

export default Notification;
