export default null;
declare let self: ServiceWorkerGlobalScope;
import 'regenerator-runtime/runtime';
import { cacheResources, clearOldCache, getResponseByRequest } from './cacheResources';
import { saveSubscription } from './pushNotification';

const openWindow = async (eventData): Promise<WindowClient> => {
  const clientList = (await self.clients.matchAll({
    type: 'window'
  })) as WindowClient[];
  if (clientList.length > 0) {
    return clientList[0].focus().then((windowClient) => windowClient.navigate(eventData.url));
  }
  if (self.clients.openWindow) {
    return self.clients.openWindow(eventData.url);
  }
};

self.addEventListener('install', async (event) => {
  self.skipWaiting();
  event.waitUntil(cacheResources());
});

self.addEventListener('fetch', async (event) => {
  event.respondWith(getResponseByRequest(event.request));
});

self.addEventListener('activate', async (event) => {
  event.waitUntil(clearOldCache());

  await saveSubscription(self.registration.pushManager);
  self.clients.claim();
});

self.addEventListener('push', (event) => {
  if (event.data && Notification.permission === 'granted') {
    try {
      const { title, ...payload } = event.data.json();
      self.registration.showNotification(title, payload);
    } catch (e) {
      self.registration.showNotification('Notification', {
        body: event.data.text()
      });
    }
  }
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  const eventData = clickedNotification.data;
  if (self.clients.openWindow && eventData && eventData.url) {
    event.waitUntil(openWindow(eventData));
  }
});

self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  if (type === 'saveSubscription') {
    saveSubscription(self.registration.pushManager);
  }
});

self.addEventListener('pushsubscriptionchange', () => {
  saveSubscription(self.registration.pushManager);
});
