exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('processes', function(table) {
      table.string('mod_2_arousability');
      table.string('exe_3_initiation');
      table.string('exe_3_planning');
      table.dropColumn('exe_3_inhibition');
      table.dropColumn('exe_3_shifting');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('processes', function(table) {
      table.dropColumn('mod_2_arousability');
      table.dropColumn('exe_3_initiation');
      table.dropColumn('exe_3_planning');
      table.string('exe_3_inhibition');
      table.string('exe_3_shifting');
    })
  ]);
};
