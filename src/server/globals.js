// Required to make packages not break that do not handle SSR properly
global.window = {
  navigator: {
    userAgent: '',
  },
  location: {},
  setTimeout: () => {},
  requestAnimationFrame: () => {},
};

global.navigator = {
  userAgent: '',
};

// Set here to have access env server-side only
global.env = require('./env');
