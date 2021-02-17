// add whitelisted origin regex for prod, local and develop branches created by zeet
const whitelistedOrigins = [
  /http:\/\/localhost.*$/, // dev
  /https:\/\/mackbellemore-mackbellemore-soen-390-team07.*$/, // prod or staging
];

// Global token variable in the service worker
let token = '';

// Intercept all fetch requests and add the auth header
const addAuthHeader = function (event) {
  // adapted from https://blog.ropnop.com/storing-tokens-in-browser/

  const destURL = new URL(event.request.url);
  const isMatch = whitelistedOrigins.some((whiteList) => whiteList.test(destURL.origin));
  if (!isMatch) return;

  const modifiedHeaders = new Headers(event.request.headers);
  if (token) {
    modifiedHeaders.append('Authorization', `Basic ${token}`);
  }
  const authReq = new Request(event.request, { headers: modifiedHeaders });
  event.respondWith((async () => fetch(authReq))());
};

// listen to messages to set or remove token
self.addEventListener('message', function (event) {
  switch (event?.data?.type) {
    case 'SET_TOKEN':
      token = event.data.token;
      break;
    case 'REVOKE_TOKEN':
      token = '';
      break;
    default:
  }
});

// listen for axios fetch events
self.addEventListener('fetch', addAuthHeader);

self.addEventListener('install', function (event) {
  self.skipWaiting();
});
