
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('terms', function(table) {
      table.increments('id').primary();
      table.string('term');
      table.string('definition');
      table.string('category_name');
      table.integer('category_id').unsigned();
      table.foreign('category_id').references('categories.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('terms'),
    knex.schema.dropTable('categories')
  ]);
};
