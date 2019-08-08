const jwt = require('jsonwebtoken');
const { API_URL } = require('../../app/utils/constants');
const env = require('../env');

// This function handles the cookies passed back with the request.
// The user object is pulled out and assigned to the request
const tokenManager = async (ctx, next) => {
  const { accessToken, refreshToken } = ctx.cookie || {};

  if (accessToken && refreshToken) {
    const { decoded, finalAccessToken } = await decodeAccessToken(accessToken, refreshToken, false);

    if (decoded) {
      const { user } = decoded;
      ctx.request.accessToken = finalAccessToken;
      ctx.request.refreshToken = refreshToken;
      ctx.request.user = user;
    }
  }

  await next();
};

module.exports = tokenManager;

// Decode the access token and return it with the decoded data
// Fetch a new access token based of refresh token if required
const decodeAccessToken = async (accessToken, refreshToken, isNewAccessToken) => {
  let decoded = null;

  if (accessToken) {
    try {
      decoded = jwt.verify(accessToken, env.jwtSecret);
    } catch (err) {
      // Invalid token
      if (err.name === 'TokenExpiredError' && refreshToken && !isNewAccessToken) {
        const newAccessToken = await requestNewAccessTokenFromRefreshToken(refreshToken);
        return decodeAccessToken(newAccessToken, refreshToken, true);
      }
      return {
        accessToken: null,
        decoded: null,
      };
    }
  }

  return {
    accessToken,
    decoded,
  };
};

// Fetch a new access token using the refresh token
const requestNewAccessTokenFromRefreshToken = async (refreshToken) => {
  if (!refreshToken) {
    return null;
  }

  const requestOptions = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  };

  const res = await fetch(`${API_URL}/auth/session/token?refreshToken=${refreshToken}`, requestOptions);
  const response = await res.json();
  return response;
};
