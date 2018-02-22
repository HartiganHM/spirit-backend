exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('clinics', function(table) {
      table.string('passcode');
    }),
    knex.schema.table('users', function(table) {
      table.string('clinic_passcode');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('clinics', function(table) {
      table.dropColumn('passcode');
    }),
    knex.schema.table('users', function(table) {
      table.dropColumn('clinic_passcode');
    })
  ]);
};
