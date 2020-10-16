const client = require("../utils/ElasticClient");

/**
 * Create the index in Elastic search
 */
async function createIndex(_id, values) {
  const response = await client.index({
    index: "campaign",
    id: _id,
    refresh: true,
    body: Object.assign({}, values),
  });
  return response;
}

/**
 * Search a campaign in the "campaign" index
 */
async function searchCampaignsInEs(query) {
  return await client.search({
    index: "campaign",
    body: {
      query: {
        match: query,
      },
    },
  });
}

/**
 * Delete a campaign by query
 */
async function deleteCampaginById(queryid) {
  return await client.delete({
    index: "campaign",
    ignore: [404],
    id: `${queryid}`,
  });
}
/**
 * Update a campaign
 */

async function updateCampaign(id, updatedDoc) {
  return await client.update({
    index: "campaign",
    id: id,
    body: {
      doc: Object.assign({}, updatedDoc),
    },
  });
}

module.exports = {
  createIndex,
  searchCampaignsInEs,
  deleteCampaginById,
  updateCampaign,
};
