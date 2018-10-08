let jwt = require('jwt-simple'),
    TOKEN_EXPIRY_DAY = require('../config/constants.js').TOKEN_EXPIRY_DAY;

let auth = {
 
  getAuthToken: function(req, res) {
    let ipV4 = req.connection.remoteAddress;
      res.json(genToken(ipV4));
  }, 
}
 
function genToken(ipAddr) {
  let expires = expiresIn(TOKEN_EXPIRY_DAY);
  let token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: ipAddr
  };
}
 
function expiresIn(numDays) {
  let dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;