// **********NB*********** CHANGE THE ENV_LEVEL FOR RN LIVE BUILDS!
// ENV_LEVEL & IS_LOCAL are special variables, as their origin depends on whether this code is running on the client or server.
// window is set for client, and global.env for server. See env.js for more
let ENV_LEVEL = 2;
let IS_LOCAL = false;
let IS_ON_SERVER = true;
if (
  typeof global !== 'undefined' &&
  typeof global.window !== 'undefined' &&
  typeof global.window &&
  global.window.envLevel
) {
  ENV_LEVEL = global.window.envLevel;
  IS_LOCAL = global.window.isLocal;
  IS_ON_SERVER = false;
} else if (typeof global !== 'undefined' && typeof global.env !== 'undefined' && global.env && global.env.envLevel) {
  ENV_LEVEL = global.env.envLevel;
  IS_LOCAL = global.env.isLocal;
}

let BASE_DOMAIN;
if (ENV_LEVEL === 1) {
  // Production
  BASE_DOMAIN = 'mydomain.com';
} else {
  // UAT
  BASE_DOMAIN = 'uat.mydomain.com';
}

export const IS_SERVER = IS_ON_SERVER;
export const DOMAIN = BASE_DOMAIN;
export const WEB_URL = IS_LOCAL ? 'http://localhost:3000' : `https://www.${BASE_DOMAIN}`;
export const API_URL = IS_LOCAL ? 'http://localhost:4000' : `https://api.${BASE_DOMAIN}`;
export const STATIC_URL = IS_LOCAL ? '' : `https://static.${BASE_DOMAIN}`;
export const IS_PROD = !IS_LOCAL && ENV_LEVEL === 1;
export const LANDING_PAGE_ROUTE = '/';
export const PATH_PAGE_TITLES = {
  '/': 'Home Page',
  '/dashboard': 'Dashboard Page',
};
export const KEY_CODES = {
  COMMA: 188,
  ENTER: 13,
  TAB: 9,
  SHIFT: 16,
  DELETE: 46,
  BACKSPACE: 8,
};
export const DEFAULT_META = {
  SITE: 'My Site.',
  TITLE: 'My title.',
  DESCRIPTION: 'This is the description.',
  KEYWORDS: 'foo, bar',
  OG_TYPE: 'website',
};
export const LOGIN_PAGES = ['/login', '/forgot-password', '/reset-password'];
export const RESTRICTED_PAGES = ['/some-restricted-route'];
