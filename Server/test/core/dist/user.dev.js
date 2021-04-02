"use strict";

var pool = require('./pool');

var bcrypt = require('bcrypt');

function User() {}

;
User.prototype = {
  // Find the user data by id or username.
  find: function find() {
    var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var callback = arguments.length > 1 ? arguments[1] : undefined;

    // if the user variable is defind
    if (user) {
      // if user = number return field = id, if user = string return field = username.
      var field = Number.isInteger(user) ? 'id' : 'username';
    } // prepare the sql query


    var sql = "SELECT * FROM users WHERE ".concat(field, " = ?");
    pool.query(sql, user, function (err, result) {
      if (err) throw err;

      if (result.length) {
        callback(result[0]);
      } else {
        callback(null);
      }
    });
  },
  // This function will insert data into the database. (create a new user)
  // body is an object 
  create: function create(body, callback) {
    var pwd = body.password; // Hash the password before insert it into the database.

    body.password = bcrypt.hashSync(pwd, 10); // this array will contain the values of the fields.

    var bind = []; // loop in the attributes of the object and push the values into the bind array.

    for (prop in body) {
      bind.push(body[prop]);
    } // prepare the sql query


    var sql = "INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)"; // call the query give it the sql string and the values (bind array)

    pool.query(sql, bind, function (err, result) {
      if (err) throw err; // return the last inserted id. if there is no error

      callback(result.insertId);
    });
  },
  login: function login(username, password, callback) {
    // find the user data by his username.
    this.find(username, function (user) {
      // if there is a user by this username.
      if (user) {
        // now we check his password.
        if (bcrypt.compareSync(password, user.password)) {
          // return his data.
          callback(user);
          return;
        }
      } // if the username/password is wrong then return null.


      callback(null);
    });
  },
  profile: function profile(body, callback) {
    // this array will contain the values of the fields.
    var bind = []; // loop in the attributes of the object and push the values into the bind array.

    for (prop in body) {
      bind.push(body[prop]);
    } // prepare the sql query


    var sql = "INSERT INTO user_profile(fullname,street, city, state,zip) VALUES (?, ?, ?,?,?)"; // call the query give it the sql string and the values (bind array)

    pool.query(sql, bind, function (err, result) {
      if (err) throw err; // return the last inserted id. if there is no error

      callback(result.insertId);
    });
  },
  fuel: function fuel(body, callback) {
    // this array will contain the values of the fields.
    var bind = []; // loop in the attributes of the object and push the values into the bind array.

    for (prop in body) {
      bind.push(body[prop]);
    } // prepare the sql query


    var sql = "INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)"; // call the query give it the sql string and the values (bind array)

    pool.query(sql, bind, function (err, result) {
      if (err) throw err; // return the last inserted id. if there is no error

      callback(result.insertId);
    });
  }
};
module.exports = User;