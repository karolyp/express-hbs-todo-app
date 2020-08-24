require('dotenv').config()

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            port: process.env.DATABASE_PORT,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_ACCESS_KEY,
        }
    },
    production: {
        client: 'mysql',
        connection: process.env.CLEARDB_DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        ssl: true
    }
};
