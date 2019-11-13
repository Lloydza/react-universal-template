// **********NB*********** CHANGE THE ENV_LEVEL FOR LIVE BUILDS!
export const ENV_LEVEL: number = typeof ENVIRONMENT_LEVEL !== 'undefined' && ENVIRONMENT_LEVEL ? ENVIRONMENT_LEVEL : 3;
const IS_LOCAL_INSTANCE = typeof IS_LOCAL !== 'undefined' && IS_LOCAL ? IS_LOCAL : false;

let BASE_DOMAIN;
if (ENV_LEVEL === 4) {
  // Production
  BASE_DOMAIN = 'mydomain.com';
} else if (ENV_LEVEL === 3) {
  // UAT
  BASE_DOMAIN = 'uat.mydomain.com';
} else if (ENV_LEVEL === 2) {
  // DEV
  BASE_DOMAIN = 'dev.mydomain.com';
} else {
  // LOCAL
  BASE_DOMAIN = 'uat.mydomain.com';
}

export const WEB_URL = IS_LOCAL_INSTANCE ? 'http://localhost:3000' : `https://www.${BASE_DOMAIN}`;
export const API_URL = `https://api.${BASE_DOMAIN}`;
export const STATIC_URL = `https://static.${BASE_DOMAIN}`;
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
