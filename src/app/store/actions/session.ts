import { WEB_URL, LANDING_PAGE_ROUTE } from 'utils/constants';
import { createReduxActions } from 'utils/utilFunctions';

export const UPDATE_SESSION_USER = 'UPDATE_SESSION_USER';
export const UPDATE_SESSION_ACCESS_TOKEN = 'UPDATE_SESSION_ACCESS_TOKEN';
export const UPDATE_SESSION_REFRESH_TOKEN = 'UPDATE_SESSION_REFRESH_TOKEN';

export const [
  updateSessionUser,
  updateSessionAccessToken,
  updateSessionRefreshToken,
] = createReduxActions(
  { type: UPDATE_SESSION_USER, key: 'user' },
  { type: UPDATE_SESSION_ACCESS_TOKEN, key: 'accessToken' },
  { type: UPDATE_SESSION_REFRESH_TOKEN, key: 'refreshToken' },
);

/**
 * Called when the client loads initially. Handles any start logic
 */
export const sessionStarted = () => async (): Promise<void> => {
  // Session logic here
};

/**
 * Handles the logout logic for the user
 */
export const logout = () => (dispatch: Dispatch): void => {
  dispatch(updateSessionUser(null));
  dispatch(updateSessionAccessToken(null));
  dispatch(updateSessionRefreshToken(null));
  window.location.href = [WEB_URL, LANDING_PAGE_ROUTE].join('');
};
