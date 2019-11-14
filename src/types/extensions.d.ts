import { Context } from 'koa';

declare module 'koa' {
  interface Context {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
  }
}
