exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('processes', function(table) {
      table.string('exe_4a_generativity');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('processes', function(table) {
      table.dropColumn('exe_4a_generativity');
    })
  ]);
};
