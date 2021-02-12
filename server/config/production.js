module.exports = {
  mongo: {
    host: process.env.PROD_MONGO_HOST,
    user: process.env.PROD_MONGO_USER,
    pass: process.env.PROD_MONGO_PASS,
    db: process.env.PROD_MONGO_DB_NAME,
  },
};
