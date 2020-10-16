require('dotenv/config');
module.exports = {
  mongoURI:
    process.env.NODE_ENV === "dev"
      ? process.env.LOCAL_MONGODB
      : process.env.MONGODB,
};
