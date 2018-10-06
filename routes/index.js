var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.js');
console.log('auth-', authController);	

// Get Auth
router.get('/getAuthToken', authController.getAuthToken);

// Main Api's routes
// router.get('/api/v1/battle/list', controllers.battle.getListing);
// router.get('/api/v1/battle/count', controllers.battle.getCount);
// router.get('/api/v1/battle/stats', controllers.battle.getStats);
//router.post('/api/v1/battle/search', controllers.battle.searchRecords);

router.all('*',function(req, res){
	res.status(404);
	res.json({"error":"Request Not Found"});
})

module.exports = router;