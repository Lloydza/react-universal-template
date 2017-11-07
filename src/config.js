var config = {};

config.defaultPort = 3002;
config.currentEnvironmentSetting = ONSERVER ? process.env.ENVIRONMENT_LEVEL || 1 : window.envLevel;;
config.onServer = ONSERVER;

export default config;