/* eslint-disable no-undef */
// **********NB*********** CHANGE THE ENV_LEVEL FOR LIVE BUILDS!
const ENV_LEVEL = typeof ENVIRONMENT_LEVEL !== 'undefined' && ENVIRONMENT_LEVEL ? ENVIRONMENT_LEVEL : 3;
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

module.exports = {
  ENV_LEVEL,
  DOMAIN: IS_LOCAL_INSTANCE ? 'localhost:3000' : `www.${BASE_DOMAIN}`,
  WEB_URL: IS_LOCAL_INSTANCE ? 'http://localhost:3000' : `https://www.${BASE_DOMAIN}`,
  API_URL: `https://api.${BASE_DOMAIN}`,
  STATIC_URL: `https://static.${BASE_DOMAIN}`,
  LANDING_PAGE_ROUTE: '/',
  RESTRICTED_PAGES: {
    '/some-resrticted-route': true,
  },
  LOGIN_PAGES: {
    '/some-login-route': true,
  },
  PATH_PAGE_TITLES: {
    '/': 'Home Page',
    '/dashboard': 'Dashboard Page',
  },
  KEY_CODES: {
    COMMA: 188,
    ENTER: 13,
    TAB: 9,
    SHIFT: 16,
    DELETE: 46,
    BACKSPACE: 8,
  },
  DEFAULT_META: {
    SITE: 'My Site.',
    TITLE: 'My title.',
    DESCRIPTION: 'This is the description.',
    KEYWORDS: 'foo, bar',
    OG_TYPE: 'website',
  },
};
