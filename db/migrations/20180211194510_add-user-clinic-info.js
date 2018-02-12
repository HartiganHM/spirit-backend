exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('clinics', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('abbreviation');
    }),

    knex.schema.table('users', function(table) {
      table.string('clinic_abbreviation');
      table.integer('clinic_id').unsigned();
      table.foreign('clinic_id').references('clinics.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('clinic_id');
      table.dropColumn('clinic_abbreviation');
    }),

    knex.schema.dropTable('clinics')
  ]);
};
