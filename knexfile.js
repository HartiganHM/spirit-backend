// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/spirit',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

};
