var config = {};

config.onServer = true;
if (typeof onServer !== 'undefined') {
  config.onServer = onServer;
}

config.currentEnvironmentSetting = config.onServer ? process.env.ENVIRONMENT_LEVEL: window.envLevel;

config.defaultPort = 3002;


module.exports = config;