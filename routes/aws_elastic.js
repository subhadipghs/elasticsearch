const express = require("express");
const router = express.Router();
const elastic = require("../utils/ElasticClient");

router.get("/es/", async (req, res) => {
  try {
    const result = await elastic.search({
      index: "",
      body: {
        query: {
          match_all: {},
        },
      },
    });
    return res.json({ body: result });
  } catch (err) {
    console.warn(err);
    return res.json({
      message: error.message,
    });
  }
});

module.exports = router;
