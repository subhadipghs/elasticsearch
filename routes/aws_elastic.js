const express = require("express");
const router = express.Router();
const elastic = require("../utils/ElasticClient");

/**
 * Search for a campaign.
 * 
 * @method  GET
 * @route  /api/es/
 */
router.get("/es/", async (req, res) => {
  try {
    const { campaignId } = req.params;
    const res = await client.ping({ requestTimeout: 40000 });
    return res.json({
      response: res
    });
  } catch (err) {
    console.warn(err);
    return res.json({
      message: error.message,
    });
  }
});


module.exports = router;
