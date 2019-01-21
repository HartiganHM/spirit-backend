exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.string('role');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.dropColumn('role');
    })
  ]);
};
