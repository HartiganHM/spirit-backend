
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('terms', function(table) {
      table.string('imgURL');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('terms', function(table) {
      table.dropColumn('imgURL');
    })
  ]);
};
