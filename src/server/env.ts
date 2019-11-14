// SERVER-SIDE ONLY. DO NOT IMPORT CLIENT-SIDE!!!!

export default {
  envLevel: process.env.ENVIRONMENT_LEVEL ? parseInt(process.env.ENVIRONMENT_LEVEL, 10) : 1,
  isLocal: Boolean(process.env.IS_LOCAL),
  jwtSecret: process.env.jwt_secret || 'J?-/r_$?fovhs:ddaw(',
  staticUrl: process.env.static_url || '',
};
