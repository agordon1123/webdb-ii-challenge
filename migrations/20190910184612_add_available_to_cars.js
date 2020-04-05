
exports.up = function(knex) {
    return knex.schema.table('cars', tbl => {
        tbl.boolean('available').notNullable().defaultTo(true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
