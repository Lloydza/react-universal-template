const ENV_LEVEL: string = typeof ENVIRONMENT_LEVEL !== 'undefined' && ENVIRONMENT_LEVEL ? ENVIRONMENT_LEVEL : 'PROD';
const IS_LOCAL_INSTANCE: boolean = typeof IS_LOCAL !== 'undefined' && IS_LOCAL ? IS_LOCAL : false;

let BASE_DOMAIN;
if (ENV_LEVEL === 'PROD') {
  // Production
  BASE_DOMAIN = 'mydomain.com';
} else {
  // UAT
  BASE_DOMAIN = 'uat.mydomain.com';
}

export const WEB_URL = IS_LOCAL_INSTANCE ? 'http://localhost:3000' : `https://www.${BASE_DOMAIN}`;
export const API_URL = IS_LOCAL_INSTANCE ? 'http://localhost:4000' : `https://api.${BASE_DOMAIN}`;
export const GRAPH_QL_URL = `${API_URL}/graphql`;
export const STATIC_URL = IS_LOCAL_INSTANCE ? '' : `https://static.${BASE_DOMAIN}`;
export const IS_PROD = !IS_LOCAL_INSTANCE && ENV_LEVEL === 'PROD';
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
