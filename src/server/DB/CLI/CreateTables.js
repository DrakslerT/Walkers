const mysql = require('mysql');
require('dotenv').config();
const fs = require('fs');

const mysqlClient = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_POST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// const mysqlClient = mysql.createConnection({
//   host: 'localhost',
//   port: '3306',
//   user: 'root',
//   password: 'root',
//   database: 'dogwalkers_test',
// });

mysqlClient.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');
});

// Prepare queries
const sqls = fs
  .readFileSync('src/server/DB/sql/DatabaseDLL.sql')
  .toString()
  .replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
  .replace(/\s+/g, ' ') // excess white space
  .replace('*', '')
  .split(';')
  .map(Function.prototype.call, String.prototype.trim)
  .filter(function (el) {
    return el.length != 0;
  });

// Execute queries

sqls.forEach((sql) =>
  mysqlClient.query(sql, (err, _result) => {
    if (err) throw err;
    console.log('Executed: \n');
    console.log(sql);
    console.log('____________________________ \n');
  })
);

console.log('Successfully added tables');

mysqlClient.destroy(); // Destroy connection after completion
