const knex = require('knex');
require('dotenv').config();

const dbInstance = knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  tls: true,
  ssl: true,
});

const testConnection = async () => {
  console.log(dbInstance.client.connectionSettings);
};

module.exports = {
  testConnection,
  dbInstance,
};
