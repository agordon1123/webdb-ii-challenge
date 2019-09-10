
exports.up = function(knex) {
    return knex.schema.createTable('sales', tbl => {
        tbl.increments();
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sales');
};
