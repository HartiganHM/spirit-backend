exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('therapy_goals', function(table) {
      table.increments('id').primary();
      table.text('modulation_goal', 'longtext');
      table.integer('modulation_ot_importance');
      table.integer('modulation_parent_importance');
      table.integer('modulation_ot_performance');
      table.integer('modulation_parent_performance');
      table.integer('modulation_ot_satisfaction');
      table.integer('modulation_parent_satisfaction');

      table.text('posture_goal', 'longtext');
      table.integer('posture_ot_importance');
      table.integer('posture_parent_importance');
      table.integer('posture_ot_performance');
      table.integer('posture_parent_performance');
      table.integer('posture_ot_satisfaction');
      table.integer('posture_parent_satisfaction');

      table.text('sensory_discrimination_goal', 'longtext');
      table.integer('sensory_discrimination_ot_importance');
      table.integer('sensory_discrimination_parent_importance');
      table.integer('sensory_discrimination_ot_performance');
      table.integer('sensory_discrimination_parent_performance');
      table.integer('sensory_discrimination_ot_satisfaction');
      table.integer('sensory_discrimination_parent_satisfaction');

      table.text('social_emotional_goal', 'longtext');
      table.integer('social_emotional_ot_importance');
      table.integer('social_emotional_parent_importance');
      table.integer('social_emotional_ot_performance');
      table.integer('social_emotional_parent_performance');
      table.integer('social_emotional_ot_satisfaction');
      table.integer('social_emotional_parent_satisfaction');

      table.text('executive_functioning_goal', 'longtext');
      table.integer('executive_functioning_ot_importance');
      table.integer('executive_functioning_parent_importance');
      table.integer('executive_functioning_ot_performance');
      table.integer('executive_functioning_parent_performance');
      table.integer('executive_functioning_ot_satisfaction');
      table.integer('executive_functioning_parent_satisfaction');
      table.integer('session_id').unsigned();
      table.foreign('session_id').references('sessions.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('therapy_goals')]);
};
