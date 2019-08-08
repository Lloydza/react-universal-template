// **********NB*********** CHANGE THE ENV_LEVEL FOR RN LIVE BUILDS!
// ENV_LEVEL & IS_LOCAL are special variables, as their origin depends on whether this code is running on the client or server.
// window is set for client, and global.env for server. See env.js for more
// Note that, for RN, it should not hit either if statement and stay the set value
let ENV_LEVEL = 3;
let IS_LOCAL = false;
let IS_SERVER = true;
if (typeof window !== 'undefined' && typeof window.envLevel !== 'undefined' && window.envLevel) {
  ENV_LEVEL = window.envLevel;
  IS_LOCAL = window.isLocal;
  IS_SERVER = false;
} else if (typeof global !== 'undefined' && typeof global.env !== 'undefined' && global.env && global.env.envLevel) {
  ENV_LEVEL = global.env.envLevel;
  IS_LOCAL = global.env.isLocal;
}

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
  IS_SERVER,
  DOMAIN: IS_LOCAL ? 'localhost:3000' : `www.${BASE_DOMAIN}`,
  WEB_URL: IS_LOCAL ? 'http://localhost:3000' : `https://www.${BASE_DOMAIN}`,
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
