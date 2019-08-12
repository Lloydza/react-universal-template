import { WEB_URL, LANDING_PAGE_ROUTE } from 'app/utils/constants';

export const UPDATE_SESSION_USER = 'UPDATE_SESSION_USER';
export const UPDATE_SESSION_ACCESS_TOKEN = 'UPDATE_SESSION_ACCESS_TOKEN';
export const UPDATE_SESSION_REFRESH_TOKEN = 'UPDATE_SESSION_REFRESH_TOKEN';

/**
 * Adds or updates the session user object
 * @param  {Object} user : The new user session object
 * @return {Object} : The resulting redux action
 */
export const updateSessionUser = (user) => {
  return {
    type: UPDATE_SESSION_USER,
    user,
  };
};

/**
 * Adds or updates the session access token
 * @param  {String} accessToken : The access token
 * @return {Object} : The resulting redux action
 */
export const updateSessionAccessToken = (accessToken) => {
  return {
    type: UPDATE_SESSION_ACCESS_TOKEN,
    accessToken,
  };
};

/**
 * Adds or updates the session refresh token
 * @param  {String} refreshToken : The refresh token
 * @return {Object} : The resulting redux action
 */
export const updateSessionRefreshToken = (refreshToken) => {
  return {
    type: UPDATE_SESSION_REFRESH_TOKEN,
    refreshToken,
  };
};

/**
 * Called when the client loads initially. Handles any start logic
 */
export const sessionStarted = () => {
  return async () => {};
};

/**
 * Handles the logout logic for the user
 */
export const logout = () => {
  return async (dispatch) => {
    dispatch(updateSessionUser(null));
    dispatch(updateSessionAccessToken(null));
    dispatch(updateSessionRefreshToken(null));
    window.location.href = [WEB_URL, LANDING_PAGE_ROUTE].join('');
  };
};
