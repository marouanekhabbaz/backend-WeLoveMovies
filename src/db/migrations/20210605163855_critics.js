
exports.up = function(knex) {
    return knex.schema.createTable("critics", (table)=>{
    table.increments("critic_id").primary(); // sets supplier_id as the primary key
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");
  })
};



exports.down =  function (knex) {
    return knex.schema.dropTable("critics");
  };
