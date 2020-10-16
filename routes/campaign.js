const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");
const {
  createIndex,
  searchCampaignsInEs,
  deleteCampaginById,
  updateCampaign,
} = require("../controllers/es");
/**
 * Save a campaign
 *
 * @method POST
 * @route /api/campaign/add
 */

router.post("/campaign/add", async (req, res) => {
  try {
    const { name, location, date } = req.body;
    console.log(location);
    const campaign = new Campaign({ name, location, date });
    const savedCampaign = await campaign.save();
    const indexedResult = await createIndex(savedCampaign.id, {
      name: name,
      location: location,
      date: date,
    });
    return res.status(201).json({
      success: true,
      campaign: savedCampaign,
      indexedResult: indexedResult,
    });
  } catch (error) {
    console.warn(error);
    return res.status(400).json({
      success: false,
      message: "Save Error",
    });
  }
});

/**
 * Search for a campaign by name
 * @method GET
 * @route /api/campaign/search/:name
 */

router.get("/campaign/search/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const response = await searchCampaignsInEs({
      name: name,
    });
    return res.status(200).json({
      sucess: true,
      response: response.hits ? response.hits : [],
    });
  } catch (error) {
    console.warn(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

/**
 * Get all campaigns
 *
 * @method GET
 * @route /api/campaign
 */

router.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find({}).exec();
    return res.status(200).json({
      success: true,
      campaign: campaigns,
    });
  } catch (error) {
    console.warn(error.message);
    console.trace(error);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * Delete a campaign by id
 *
 * @method DELETE
 * @route /api/campaign/:id
 */
router.delete("/campaign/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.find({ id: id }).exec();
    if (campaign) {
      const response = await Campaign.deleteOne({ id: id });
      const esResponse = await deleteCampaginById(id);
      return res.status(200).json({
        success: true,
        response: response,
        es: esResponse,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
  } catch (error) {
    console.warn(error.message);
    console.trace(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/campaign/update/:id", async (req, res) => {
  try {
    const { name, location, date } = req.body;
    const { id } = req.params;
    console.info('id', id, name, location, date);
    const camp = await Campaign.findOneAndUpdate(
      { _id: id },
      { name: name, location: location, date: date }
    );
    console.log(camp);
    const es = await createIndex(id, {
      name: name,
      location: location,
      date: date,
    });
    return res.status(200).json({
      success: true,
      es: es,
      camp: camp,
    });
  } catch (error) {
    console.warn(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
