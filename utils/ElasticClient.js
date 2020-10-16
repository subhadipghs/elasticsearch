const dotenv = require('dotenv');
dotenv.config();
const { Client } = require("elasticsearch");

const ElasticClient = new Client({
  host: process.env.ES_URI,
  log: "error",
});

module.exports = ElasticClient;
