const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");


router.post("/addcampaign",(req,res) =>{
    const campaign = new Campaign(req.body);
    campaign.save()
            .then(data => res.json({msg:"Campaign saved"}))
            .catch(err => console.log(err));
});

module.exports = router;