let express = require('express');
let router = express.Router();

let authController = require('../controllers/auth.js');
let battleController = require('../controllers/battle.js');

// Get Auth
router.get('/getAuthToken', authController.getAuthToken);

// Main Api's routes
router.get('/api/v1/battle/list', battleController.getListing);
router.get('/api/v1/battle/count', battleController.getCount);
router.get('/api/v1/battle/stats', battleController.getStats);
router.get('/api/v1/battle/search', battleController.searchRecords);

router.all('*',function(req, res){
	res.status(404);
	res.json({"error":"Request Not Found"});
})

module.exports = router;