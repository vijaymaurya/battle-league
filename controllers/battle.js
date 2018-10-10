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
	},
	searchRecords : function(req, resp){

		if(req.query){
			let queryString = {};
			Object.keys(req.query).forEach(function(key){
				switch(key){
					case 'battle_name':
						if(req.query.battle_name != '')
							queryString['name'] = req.query.battle_name;
						break;
					case 'location':
							if(req.query.location != '')
						queryString['location'] = req.query.location;
						break;
					default:
						break;
				}
			});

			if(queryString && Object.keys(queryString).length > 0){

				let selected = {'_id' : 0, 'name' : 1, 'battle_number' : 1, 'location' : 1};

				battleModel.find(queryString, selected, function(err, data){
					if(err){
						console.log('err', err);
						resp.json('Something went wrong');
					} 

					if(Object.keys(data).length > 0){
						resp.json(data);
					}else{
						resp.json('No record found');
					}
				});
			}else{
				resp.json('Invalid Parameters');
			}
		}
	}

}
module.exports = battles;