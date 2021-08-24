// Update with your config settings.
import path from 'path'

module.exports = {

  development: {
    client: "sqlite3",
    connection: {
      filename: `${__dirname}/src/database/database.sqlite`
      // filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
      // directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
