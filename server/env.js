module.exports = {
  API_PORT: process.env.API_PORT || 5000,
  SEPARATOR: process.env.SEPARATOR || '@##@',
  MLAB_MONGO_DB: process.env.MLAB_MONGO_DB || '',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'SushiHomeRolls',
}
