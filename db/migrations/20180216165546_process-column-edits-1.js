exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('processes', function(table) {
      table.string('pos_4_core');
      table.string('pos_4_shoulder');
      table.string('pos_4_pelvic');
      table.string('pos_4_head');
      table.string('pos_4_eyes');
      table.string('pos_4_hand');
      table.string('pos_4_lower');
      table.string('pos_4_foot');
      table.string('soc_2_social_perspective');
      table.dropColumn('pos_4_diagram');
    }),

    knex.schema.table('sessions', function(table) {
      table.boolean('completed').defaultTo(false);
    }),

    knex.schema.table('therapy_goals', function(table) {
      table.text('goal', 'longtext');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('processes', function(table) {
      table.dropColumn('pos_4_core');
      table.dropColumn('pos_4_shoulder');
      table.dropColumn('pos_4_pelvic');
      table.dropColumn('pos_4_head');
      table.dropColumn('pos_4_eyes');
      table.dropColumn('pos_4_hand');
      table.dropColumn('pos_4_lower');
      table.dropColumn('pos_4_foot');
      table.dropColumn('soc_2_social_perspective');
      table.string('pos_4_diagram');
    }),

    knex.schema.table('sessions', function(table) {
      table.dropColumn('completed').defaultTo(false);
    }),

    knex.schema.table('therapy_goals', function(table) {
      table.dropColumn('goal', 'longtext');
    })
  ]);
};
