/**
 * This script is used on the client to store and relay the Json Web Token provided
 * by our server when the user initially logs in. Instead of storing the token in a cookie
 * or in localstorage, we store it here in the token variable which is persisted in the browser
 * memory. This is the safest approach to store a token. Since we have our token here,
 * we need to add it to all our requests so the addAuthHeader function will intercept
 * axios requests and append an authorization header along with the token.
 * You can visit https://auth0.com/docs/tokens/token-storage#browser-in-memory-scenarios
 * to learn more about storing tokens in memory.
 * Learn more about how service workers work https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#service_worker_concepts_and_usage
 */

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

/**
 * these next 2 functions are used to allow this file to
 * activate on the first page load so that all requests can have the token
 */
self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
