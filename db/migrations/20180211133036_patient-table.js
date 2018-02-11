exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('patients', function(table) {
      table.increments('id').primary();
      table.string('abstracted_name');
      table.string('clinic_name');
      table.integer('ot_id').unsigned();
      table.foreign('ot_id').references('users.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('patients')]);
};
