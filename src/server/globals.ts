import env from './env';
// See types.d.ts for Global structure

// Required to make packages not break that do not handle SSR properly
global.window = {
  navigator: {
    userAgent: '',
  },
  location: {},
  setTimeout: (): void => {},
  requestAnimationFrame: (): void => {},
};

global.navigator = {
  userAgent: '',
};

// Set here to have access env server-side only
global.env = env;
