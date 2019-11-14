import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { API_URL } from 'utils/constants';

// This function handles the cookies passed back with the request.
// The user object is pulled out and assigned to the request
const tokenManager = async (ctx: Koa.Context, next: Koa.Next): Promise<void> => {
  const { accessToken, refreshToken } = ctx.cookie || {};

  if (accessToken && refreshToken) {
    const { decoded, accessToken: finalAccessToken } = await decodeAccessToken({
      accessToken,
      refreshToken,
      isNewAccessToken: false,
    });

    if (decoded) {
      const { user } = decoded;
      ctx.accessToken = finalAccessToken;
      ctx.refreshToken = refreshToken;
      ctx.user = user;
    }
  }

  await next();
};

export default tokenManager;

// Decode the access token and return it with the decoded data
// Fetch a new access token based of refresh token if required
interface DecodeAccessTokenProps {
  accessToken: string;
  refreshToken: string;
  isNewAccessToken: boolean;
}
interface DecodeAccessTokenReturn {
  accessToken: string | null;
  decoded: {
    user: User;
  } | null;
}
const decodeAccessToken = async ({
  accessToken,
  refreshToken,
  isNewAccessToken,
}: DecodeAccessTokenProps): Promise<DecodeAccessTokenReturn> => {
  let decoded = null;

  if (accessToken) {
    try {
      decoded = jwt.verify(accessToken, global.env.jwtSecret);
    } catch (err) {
      // Invalid token
      if (err.name === 'TokenExpiredError' && refreshToken && !isNewAccessToken) {
        const newAccessToken = await requestNewAccessTokenFromRefreshToken(refreshToken);
        return decodeAccessToken({ accessToken: newAccessToken, refreshToken, isNewAccessToken: true });
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
const requestNewAccessTokenFromRefreshToken = async (refreshToken: string): Promise<string> => {
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
