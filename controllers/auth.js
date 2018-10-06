var jwt = require('jwt-simple'),
    TOKEN_EXPIRY_DAY = require('../config/constants.js').TOKEN_EXPIRY_DAY;

var auth = {
 
  getAuthToken: function(req, res) {
    var ipV4 = req.connection.remoteAddress;
      res.json(genToken(ipV4));
  }, 
}
 
function genToken(ipAddr) {
  var expires = expiresIn(TOKEN_EXPIRY_DAY);
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: ipAddr
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;