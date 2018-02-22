exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sessions', function(table) {
      table.increments('id').primary();
      table.integer('concern_id').unsigned();
      table.foreign('concern_id').references('primary_concerns.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('sessions')]);
};
