let mongoose = require('mongoose'),
    config = require('./masterConfig.json'),
    env = config.environment;

//
mongoose.connect('mongodb://' +config['mongo'][env]['host']+":"+config['mongo'][env]['port']+'/'+config['mongo'][env]['database']+'?readPreference=secondaryPreferred');
//mongoose.connect('mongodb://vijaymaurya57:<pwd>@ds123753.mlab.com:23753/league');
let db = mongoose.connection;

db.on('error', function (err) {
  // error on startup
   console.log('Mongoose connection error: ' + err);
});

db.once('open', function callback() {
    console.log('Mongoose connection open to ' + config['mongo'][env]['host'] + ".");
});

// When the connection is disconnected
db.on('disconnected', function () {  
  console.log('Mongoose connection disconnected'); 
});

process.on('SIGINT', function() {  
  db.close(function () { 
    console.log('Mongoose connection disconnected through app termination.'); 
    process.exit(0); 
  }); 
});  

module.exports = db;
