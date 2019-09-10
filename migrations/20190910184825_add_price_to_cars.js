
exports.up = function(knex) {
    return knex.schema.table('cars', tbl => {
        tbl.integer('price');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
