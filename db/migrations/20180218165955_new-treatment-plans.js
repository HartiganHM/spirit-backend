exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('treatment_plans', function(table) {
      table.increments('id').primary();
      table.text('modulation_sensory', 'longtext');
      table.text('modulation_task', 'longtext');
      table.text('modulation_environment', 'longtext');
      table.text('modulation_predictability', 'longtext');
      table.text('modulation_self_regulation', 'longtext');
      table.text('modulation_interaction', 'longtext');
      table.text('modulation_JRC_AR_notes', 'longtext');

      table.text('posture_sensory', 'longtext');
      table.text('posture_task', 'longtext');
      table.text('posture_environment', 'longtext');
      table.text('posture_predictability', 'longtext');
      table.text('posture_self_regulation', 'longtext');
      table.text('posture_interaction', 'longtext');
      table.text('posture_JRC_AR_notes', 'longtext');

      table.text('sensory_discrimination_sensory', 'longtext');
      table.text('sensory_discrimination_task', 'longtext');
      table.text('sensory_discrimination_environment', 'longtext');
      table.text('sensory_discrimination_predictability', 'longtext');
      table.text('sensory_discrimination_self_regulation', 'longtext');
      table.text('sensory_discrimination_interaction', 'longtext');
      table.text('sensory_discrimination_JRC_AR_notes', 'longtext');

      table.text('social_emotional_sensory', 'longtext');
      table.text('social_emotional_task', 'longtext');
      table.text('social_emotional_environment', 'longtext');
      table.text('social_emotional_predictability', 'longtext');
      table.text('social_emotional_self_regulation', 'longtext');
      table.text('social_emotional_interaction', 'longtext');
      table.text('social_emotional_JRC_AR_notes', 'longtext');

      table.text('executive_functioning_sensory', 'longtext');
      table.text('executive_functioning_task', 'longtext');
      table.text('executive_functioning_environment', 'longtext');
      table.text('executive_functioning_predictability', 'longtext');
      table.text('executive_functioning_self_regulation', 'longtext');
      table.text('executive_functioning_interaction', 'longtext');
      table.text('executive_functioning_JRC_AR_notes', 'longtext');
      table.integer('session_id').unsigned();
      table.foreign('session_id').references('sessions.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable('treatment_plans')]);
};
