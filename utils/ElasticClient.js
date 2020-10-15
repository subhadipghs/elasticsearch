const { Client } = require("elasticsearch");

const ElasticClient = new Client({
  host: "http://localhost:9200",
  log: "error",
});

module.exports = ElasticClient;
