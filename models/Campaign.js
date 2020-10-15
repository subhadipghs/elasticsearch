const mongoose = require("mongoose");

// Create Schema
const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type:String
  },
  date: {
    type: String
  }
});

module.exports = Campaign = mongoose.model("campaigns", CampaignSchema);