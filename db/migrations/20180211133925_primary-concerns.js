exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('primary_concerns', function(table) {
      table.increments('id').primary();
      table.text('description', 'longtext');
      table.boolean('domain_1').defaultTo(false);
      table.boolean('domain_2').defaultTo(false);
      table.boolean('domain_3').defaultTo(false);
      table.boolean('domain_4').defaultTo(false);
      table.boolean('domain_5').defaultTo(false);
      table.boolean('domain_6').defaultTo(false);
      table.text('notes', 'longtext');
      table.integer('patient_id').unsigned();
      table.foreign('patient_id').references('patients.id');
      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('primary_concerns')]);
};
