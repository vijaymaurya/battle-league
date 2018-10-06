var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.js');
var battleController = require('../controllers/battle.js');
console.log('auth-', authController);

// Get Auth
router.get('/getAuthToken', authController.getAuthToken);

console.log('routes');
// Main Api's routes
router.get('/api/v1/battle/list', battleController.getListing);
router.get('/api/v1/battle/count', battleController.getCount);
router.get('/api/v1/battle/stats', battleController.getStats);
//router.post('/api/v1/battle/search', battleController.searchRecords);

router.all('*',function(req, res){
	res.status(404);
	res.json({"error":"Request Not Found"});
})

module.exports = router;