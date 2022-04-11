import { getConfig, saveConfig } from './persist';

let cachedToken = '';

const urlB64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const calculateHash = (input: string) => {
  let hash = 0;
  if (input.length === 0) {
    return hash;
  }
  for (let i = 0; i < input.length; i++) {
    const chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

let timerId: ReturnType<typeof setTimeout> = null;

export const saveSubscription = async (pushManager: PushManager, accessToken?: string) => {
  if (timerId) {
    clearTimeout(timerId);
  }
  if (typeof accessToken !== 'undefined') {
    cachedToken = accessToken;
  }
  if (Notification.permission !== 'granted') {
    return;
  }
  timerId = setTimeout(async () => {
    const currentConfig = await getConfig();
    try {
      const options = {
        applicationServerKey: urlB64ToUint8Array(currentConfig.publicKey || ''),
        userVisibleOnly: true
      };
      const subscription = await pushManager.subscribe(options);
      const hash = calculateHash(`${subscription.endpoint}${cachedToken}`);
      if (currentConfig.hash !== hash) {
        currentConfig.hash = hash;
        await saveConfig(currentConfig);
        fetch('/push/save-subscription', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: cachedToken ? `Bearer ${cachedToken}` : ''
          },
          body: JSON.stringify(subscription)
        });
      }
    } catch (err) {
      console.log('Error', err);
    }
  }, 1000);
};
