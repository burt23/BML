var crypto = require('crypto');
var db = require('../dbUtils.js');

//validate user and return salt
var getSalt = function(user, callback){
  //query db for user match
  return db.getUserSalt(user, function(error, results){
    if(error){
      console.log(error);
    } else {
      callback(null, results);
    }
  })
}

var sha512 = function(pass, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(pass);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  }
}

var hashPass = function(req, res, next) {
  if(req.body.pass){
    var userSalt = getSalt(req.body.user, function(error, salt){
      if(error){
        console.log(error);
      } else if (salt.length === 0) {
        console.log('cant find users salt, ', salt)
        next();
      } else {
        var passwordData = sha512(req.body.pass, salt[0].salt);
        req.body.pass = passwordData.passwordHash;
        next();
      }
    });
  }
}

module.exports = hashPass;
