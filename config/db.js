const mysql = require('mysql2');

// Create a promise-based connection pool
const db = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'siteforge',
  })
  .promise();

module.exports = db;
