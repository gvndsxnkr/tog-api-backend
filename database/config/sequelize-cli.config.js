/* eslint-disable @typescript-eslint/no-var-requires */
const arguments = process.argv.slice(2);
const index = arguments?.indexOf('--env');
const envFile = arguments[index + 1] == 'prod' ? '.env.prod' : '.env.dev';
require('dotenv').config({ path: envFile });

module.exports = {
  development: {
    url: process.env.DB_URI,
    dialect: 'postgres',
    schema: 'public',
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
  prod: {
    username: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASS,
    database: process.env.PG_DB_NAME,
    host: process.env.PG_DB_HOST,
    port: process.env.PG_DB_PORT,
    dialect: 'postgres',
    schema: 'public',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
