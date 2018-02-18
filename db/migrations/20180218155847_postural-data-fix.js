exports.up = function(knex, Promise) {
  knex.schema.table('processes', function(table) {
    table.dropColumn('pos_1_outer');
    table.dropColumn('pos_1_inner');
    table.boolean('pos_1_outer');
    table.boolean('pos_1_inner');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.table('processes', function(table) {
    table.dropColumn('pos_1_outer');
    table.dropColumn('pos_1_inner');
    table.string('pos_1_outer');
    table.string('pos_1_inner');
  });
};
