exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('therapy_goals')]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('therapy_goals', function(table) {
      table.increments('id').primary();
      table.string('category');
      table.integer('ot_importance');
      table.integer('parent_importance');
      table.integer('ot_performance');
      table.integer('parent_performance');
      table.integer('ot_satisfaction');
      table.integer('parent_satisfaction');
      table.integer('session_id').unsigned();
      table.foreign('session_id').references('sessions.id');
      table.timestamps(true, true);
    })
  ]);
};
