let jwt = require('jwt-simple');
 
module.exports = function(req, res, next) {
  
  let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
 
  	if (token) {
    	try {
	     	let decoded = jwt.decode(token, require('../config/secret.js')());
		 
		    if (decoded.exp <= Date.now()) {
		        res.status(400);
		        res.json({"status": 400,"message": "Token Expired"});
		        return;
		    }else{
			 	next();
		    }
    	} 
    	catch (err) {
		    res.status(500);
		    res.json({"status": 500,"message": "Invalid Token.","error": err});
	    }
  	} else {
	    res.status(401);
	    res.json({"status": 401,"message": "Provide token for authentication."});
	    return;
  	}
};