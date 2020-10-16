const mongoose = require("mongoose");

// Create Schema
const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    coordinates: {
      latitude: Number,
      longitude: Number
    },
  },
  date: {
    type: String,
  },
});

module.exports = Campaign = mongoose.model("campaigns", CampaignSchema);
