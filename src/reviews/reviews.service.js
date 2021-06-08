const knex = require("../db/connection");
const properties = require("../utils/map-properties")

const addCategory = properties({
    organization_name:"critic.organization_name",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",

});
function list(review_id) {
    return knex("reviews").select("*").where({review_id}).first()
  };
list(449).then(console.log)

function destroy(id) {
    return knex("reviews").where({"review_id": id }).del();
  };
  

  function update(review) {
    return knex("reviews")
      .select("*")
      .where({ review_id : review.review_id })
      .update(review, "*");
  };

  function readRev(id){

    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*","c.*")
    .where({"r.review_id":id})
    .first()
    .then(addCategory)
};

  module.exports={
      list,
      update,
      readRev,
      delete: destroy

  };
