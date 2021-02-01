import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// place all config related things here and inject it anywhere in app
module.exports = {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9091,
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
};
