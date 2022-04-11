import React, { useCallback, useEffect, useState } from 'react';


interface EnableNotificationsProps {
  notificationsEnabled: boolean;
  onChange: ((enabled: boolean) => void) | ((value: any) => any);
}


const EnableNotifications: React.FC<EnableNotificationsProps> = ({ notificationsEnabled, onChange }) => {
  useEffect(() => {
    onChange(Notification.permission === 'granted');
  }, [onChange]);
  const requestPermission = useCallback(async () => {
    const permission = await window.Notification.requestPermission();

    if (permission !== 'granted') {
      onChange(false);
    } else {
      onChange(true);
    }
  }, [onChange]);
  if (!process.browser) {
    return null;
  }
  if (!notificationsEnabled) {
    return <span style={{
      cursor: 'pointer'
    }} onClick={requestPermission}>🔔</span>;
  }
  return null;
};

const NotificationSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState();
  useEffect(() => {
    if (notificationsEnabled && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'saveSubscription'
      });
    }
  }, [notificationsEnabled]);
  if (process.browser && Notification.permission !== 'granted') {
    return <EnableNotifications notificationsEnabled={notificationsEnabled} onChange={setNotificationsEnabled} />;
  }
  return <span style={{
    cursor: 'pointer'
  }} >[🔔]</span>;
};

export default NotificationSettings;
