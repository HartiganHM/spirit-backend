
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('name');
    }),

    knex.schema.createTable('terms', function(table) {
      table.increments('id').primary();
      table.string('term');
      table.text('definition', 'longtext');
      table.string('imageURL');
      table.string('category_name');
      table.integer('category_id').unsigned();
      table.foreign('category_id').references('categories.id');
    }),

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('authrocket_id');
      table.string('name');
      table.string('email');
      table.boolean('admin').defaultTo(false);
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('terms'),
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('users')
  ]);
};
