var mysql = require('mysql');
var dbConfig = require('./dbConfig.js');
var crypto = require('crypto');

var connection = mysql.createConnection({
  host: 'localhost',
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports = {

  selectAll : function(userId, callback) {
  connection.query('SELECT * FROM messages where user_id = ?', [userId], function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      console.log('selectALLLLLLLLLLLLLLLLL results', results);
      callback(null, results);
    }
  });
},

  insert : function(message, userId, callback) {
    connection.query('INSERT INTO messages (user_id, message) VALUES (?,?)', [userId, message], function(err, results, fields) {
      if(err) {
        console.log('resultsERRRRR', results);
        callback(err, null);
      } else {
        console.log('results AFTER INSERT', results);
        callback(null, true);
      }
    })
  },

  saveWallet: function(wallet, callback) {
    // console.log('wallet', wallet.account.accountKey);
    // console.log('wallet.account', wallet.account.receiveAddress);
    // console.log('wallet.account', wallet.state.coin);
    // console.log('wallet.account', wallet.id);
    if(wallet.account){

      connection.query('UPDATE users SET account_key = ?, address = ?, balance = ? WHERE user=?', [wallet.account.accountKey, wallet.account.receiveAddress, wallet.state.coin, wallet.id], function(error, results) {
        if(error){
          callback(error, null)
        } else {
          callback(null, results);
        }
      })
    } else {
      callback(null, null);
    }
  },

  getUserSalt: function(username, callback){
    connection.query('SELECT salt FROM users WHERE user = ?', [username], function(err, results, fields) {
      if(err){
        callback(err, null)
      } else {
        console.log('getUserSalt', results);
        callback(null, results);
      }
    })
  },

  checkUsername : function(username, callback) {
    connection.query('SELECT * FROM users WHERE user = ? ', [username], function(err, results, fields) {
      if(err) {
        callback(err, null);
      } else if (results.length === 0){
        console.log('inside checkUser NEW USER ADDED', results);
        callback(err, true);
      } else {
        console.log('USER ALREADY EXISTS, try again ??????', results);
        callback(err, false);
      }
    })
  },

  addUser : function(username, password, salt, callback) {
    connection.query('INSERT INTO users (user, password, salt) values (?, ?, ?)', [username, password, salt], function(err, results, fields) {
      if(err){
        console.log(err)
        callback(err, null, null)
      } else {
        console.log('insertID', results.insertId);
        callback(null, true, results.insertId);
      }
    })
  },

  validateUser : function(username, password, salt, callback) {
    connection.query('SELECT id FROM users where user = ? AND password = ?', [username, password], function(err, results, fields) {
      if(err){
        console.log('error in validate user', err);
        callback(err, null);
      } else if (results.length === 0) {
        callback(null, false, null);
      } else {
        callback(null, true, results[0].id);
      }
    })
  }


}