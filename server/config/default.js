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
};
