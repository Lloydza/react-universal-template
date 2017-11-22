var config = {};

config.defaultPort = 3002;
config.currentEnvironmentSetting = 1;
if (typeof process !== 'undefined' && process && process.env && process.env.ENVIRONMENT_LEVEL) {
	config.currentEnvironmentSetting = process.env.ENVIRONMENT_LEVEL;
}
else if (typeof window !== 'undefined' && window && window.envLevel) {
	config.currentEnvironmentSetting = window.envLeve;
}

module.exports = config;