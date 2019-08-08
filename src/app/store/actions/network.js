import { API_URL } from 'app/utils/constants';
import { error } from 'app/utils/utilFunctions';
import { updateSessionAccessToken } from 'app/store/actions';

/**
 * Handles making the a request to our server resource.
 * -> If there is an auth token it is added to the header.
 * -> The app is set into a loading state if required.
 * -> If there is an error with the request, the appropriate message is shown.
 * @param  {String} url : The request url
 * @param  {Boolean} requestOptions : The request options
 * @param  {Boolean} options : Additional logic options in handling the request,
 * such as whether to set the app into a loading state or override the error handling.
 * @return {Object} : The resulting data from the request
 */
export const makeRequest = (url, requestOptions, options = {}, count = 0) => {
  return async (dispatch, getState) => {
    if (!url || !requestOptions) {
      throw error('response.invalidRequestParameters', 400);
    }

    const finalRequestOptions = {
      method: requestOptions.method,
      headers: requestOptions.headers || { 'content-type': 'application/json' },
    };

    const state = getState();
    const { accessToken } = state.session;
    if (accessToken && !options.noAccessToken) {
      finalRequestOptions.headers.Authorization = accessToken;
    }
    if (requestOptions.body) {
      finalRequestOptions.body = requestOptions.body;
    }

    try {
      const response = await doMakeRequest(url, finalRequestOptions);
      return { data: response };
    } catch (err) {
      const code = err.code || 500;
      const messageId = err.messageId || 'response.generalError';

      if (code === 401 && messageId === 'response.tokenExpired') {
        if (count < 3) {
          return new Promise((resolve, reject) => {
            const awaitFunction = async () => {
              try {
                const result = dispatch(makeRequest(url, requestOptions, options, count + 1));
                resolve(result);
              } catch (promiseError) {
                reject(promiseError);
              }
            };

            dispatch(requestNewAccessTokenFromRefreshToken(awaitFunction));
          });
        }
      }

      if (!options.overrideError) {
        if (options.isServer && code >= 500) {
          throw error(messageId, code);
        }
      }

      return { error: { code: err.status || 500 } };
    }
  };
};

// *** PRIVATE FUNCTIONS ***
// Do the actual network request and throw the appropriate error if required
const doMakeRequest = async (url, requestOptions) => {
  const res = await fetch(url, requestOptions);

  const { status } = res;
  if (status >= 200 && status < 300) {
    return status === 204 ? null : res.json();
  }

  if (status === 404) {
    throw error('response.notFound', status);
  }

  if (status === 400 || status === 403 || status === 401) {
    const response = await res.json();
    throw error(response.code, status);
  }

  throw error('response.generalError', status);
};

// Attempts to get a new access token using the refresh token stored in cookies
const awaitingFetchCalls = [];
let isFetchingNewAccessToken = false;
const requestNewAccessTokenFromRefreshToken = (fetchCallToCall) => {
  return async (dispatch, getState) => {
    const state = getState();
    const { refreshToken } = state.session;
    if (!refreshToken) {
      return;
    }

    awaitingFetchCalls.push(fetchCallToCall);

    if (isFetchingNewAccessToken) {
      return;
    }

    const requestOptions = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    };

    try {
      isFetchingNewAccessToken = true;
      const res = await fetch(`${API_URL}/auth/session/token?refreshToken=${refreshToken}`, requestOptions);
      const response = await res.json();

      if (response && response.accessToken) {
        dispatch(updateSessionAccessToken(response.accessToken));

        while (awaitingFetchCalls.length > 0) {
          const nextCall = awaitingFetchCalls.pop();
          nextCall();
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      isFetchingNewAccessToken = false;
    }
  };
};
