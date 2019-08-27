import { WEB_URL, LANDING_PAGE_ROUTE } from 'app/utils/constants';
import { createReduxActions } from 'app/utils/utilFunctions';

export const UPDATE_SESSION_USER = 'UPDATE_SESSION_USER';
export const UPDATE_SESSION_ACCESS_TOKEN = 'UPDATE_SESSION_ACCESS_TOKEN';
export const UPDATE_SESSION_REFRESH_TOKEN = 'UPDATE_SESSION_REFRESH_TOKEN';

export const [updateSessionUser, updateSessionAccessToken, updateSessionRefreshToken] = createReduxActions([
  { type: UPDATE_SESSION_USER, key: 'user' },
  { type: UPDATE_SESSION_ACCESS_TOKEN, key: 'accessToken' },
  { type: UPDATE_SESSION_REFRESH_TOKEN, key: 'refreshToken' },
]);

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
