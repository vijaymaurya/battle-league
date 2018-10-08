let mongoose = require('mongoose');
let constants =  require('../config/constants');

let battleModel = require('../models/battleModel.js');

let battles = {
	getListing : function(req, res){

		battleModel.distinct("location", function(err, data){
			if(err) console.log('err',err);

			res.json(data);
		});
	},
	getCount : function(req, res){

		battleModel.countDocuments({}, function(err, count){
			if(err) console.log('err', err);

			console.log('count', count);
			res.json(count);
		});
	},

	getStats : function(req, res){

		battleModel.find({}, function(err, count){
			if(err) console.log('err', err);

			//'most_active'
			//'attacker_outcome'
			//'battle_type',
			//'defender_size'

			console.log('count', count);
			res.json(count);
		});
	}

}
module.exports = battles;