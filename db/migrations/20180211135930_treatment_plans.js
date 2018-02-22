exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('treatment_plans', function(table) {
      table.increments('id').primary();
      table.string('category');
      table.text('sensory', 'longtext');
      table.text('task', 'longtext');
      table.text('environment', 'longtext');
      table.text('predictability', 'longtext');
      table.text('self_regulation', 'longtext');
      table.text('interaction', 'longtext');
      table.text('JRC_AR_notes', 'longtext');
      table.integer('session_id').unsigned();
      table.foreign('session_id').references('sessions.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('treatment_plans')]);
};
