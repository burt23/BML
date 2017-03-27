var crypto = require('crypto');

//generate random salt

var randomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length);
}

var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    passwordHash: value
  }
}

var hashPass = function(req, res, next) {
  if (req.body.pass) {
    var salt = randomString(40);
    var passwordData = sha512(req.body.pass, salt);

    // var hash = crypto.createHash('sha256');
    // hash.update(req.body.password);
    // req.body.password = hash.digest('hex');
    req.body.pass = passwordData.passwordHash;
    req.body.salt = passwordData.salt;

    next();
  }
}

module.exports = hashPass;