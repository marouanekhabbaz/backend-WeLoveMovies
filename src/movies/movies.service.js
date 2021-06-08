const knex = require("../db/connection");
const getRowMapConfiguration = require("../utils/reduce-properties");
const properties = require("../utils/map-properties");

const addCategory = properties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name:"critic.organization_name"
});

function list(query) {
if(query){
        return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .select("m.*")
        .where({"mt.is_showing":true})
        .groupBy("m.movie_id")
    }
    else{ 
  return knex("movies").select("*")}
}
 

function readData(id){
    return knex("movies")
    .select("*")
    .where({"movie_id":id})
    .first()
}

function readTh(id){
return knex("movies as m")
.join("movies_theaters as mt", "mt.movie_id" , "m.movie_id" )
.join("theaters as t", "t.theater_id", "mt.theater_id")
.select("t.*")
.where({"m.movie_id":id})
}

function readRev(id){
    return knex("reviews as r")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*","c.*")
    .where({"m.movie_id":id})
    .then((x)=> x.map(addCategory))
}



module.exports = {
  list,
  readData,
  readTh,
  readRev
};
