// eslint-disable-next-line
require('dotenv').config({ path: './.env' });

// place all config related things here and inject it anywhere in app
module.exports = {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9090,
    authEnabled: process.env.AUTH_ENABLED || false,
  },
  env: process.env.NODE_ENV || 'development',
  mongo: {
    port: process.env.MONGO_PORT || 27017,
    host: process.env.MONGO_HOST || 'mongo',
    user: process.env.MONGO_USER || 'root',
    pass: process.env.MONGO_PASS || 'example',
    db: process.env.MONGO_DB_NAME || 'app_db',
  },
  salt: process.env.SALT || 10,
  jwt: {
    secret: process.env.JWT_SECRET || 'addadasjfghKEU10dawadrfgh!e29sosafelol',
    expiry: process.env.JWT_EXPIRY || '30m',
  },
  email: {
    user: 'soen390.team07@gmail.com',
    pass: process.env.EMAIL_PASS || '',
  },
  origin: process.env.ORIGIN || 'http://localhost:3000',
};
