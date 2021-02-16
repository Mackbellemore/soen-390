// add whitelist origin regex for prod, local and develop branches created by zeet

// Global token variable in the service worker
let token = 'test';

const addAuthHeader = function (event) {
  // adapted from https://blog.ropnop.com/storing-tokens-in-browser/
  const destURL = new URL(event.request.url);
  const modifiedHeaders = new Headers(event.request.headers);
  if (token) {
    modifiedHeaders.append('Authorization', `Basic ${token}`);
  }
  const authReq = new Request(event.request, { headers: modifiedHeaders });
  event.respondWith((async () => fetch(authReq))());
};

// Intercept all fetch requests and add the auth header
self.addEventListener('message', function (event) {
  switch (event?.data?.type) {
    case 'SET_TOKEN':
      token = event.data.token;
      console.log('token set with ', token);
      break;
    case 'REVOKE_TOKEN':
      token = '';
      console.log('token unset');
      break;
    default:
      return;
  }
});

// listen for axios fetch events
self.addEventListener('fetch', addAuthHeader);

// needed to activate the service worker on reload
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('install', function (event) {
  self.skipWaiting();
});
