"use strict";

var util = require('util');

var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clientfueldb'
});
pool.getConnection(function (err, connection) {
  if (err) console.error('Something went wrong connecting to the database.');
  if (connection) connection.release();
  return;
});
pool.query = util.promisify(pool.query);
module.exports = pool;