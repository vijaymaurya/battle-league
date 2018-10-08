let express  = require('express');
let app = express();

// require('./connections/con-mongo');
// require('./models/usersModel');
//var parser = require('body-parser');

//app.use(parser.json());

// icreasing the limit : else giving error Request entity too large.
// app.use(bodyParser.json({limit:'100mb'}));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

let config = require('./config/masterConfig.json');

app.listen(config.PORT);
console.log("App listening on port ",config.PORT);


app.all('/*', function(req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
app.use('/', require('./routes'));