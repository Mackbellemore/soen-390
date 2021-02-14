module.exports = {
  mongo: {
    host: process.env.STAGING_MONGO_HOST,
    user: process.env.STAGING_MONGO_USER,
    pass: process.env.STAGING_MONGO_PASS,
    db: process.env.STAGING_MONGO_DB_NAME,
  },
};
