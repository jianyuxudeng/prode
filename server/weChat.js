var app = require("./com");
var mysql = require("mysql");
var bodyParser = require('body-parser');

//var db_config = {
//	host: 'hdm184708359.my3w.com',
//	user: 'hdm184708359',
//	password: '19880811',
//	database: 'hdm184708359_db'
//};

var db_config = {
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'dbAdmin'
};

app.get('/login', function(req, res) {
	var connection;
	var sql = 'select * from products';
	connection = mysql.createConnection(db_config);
	connection.connect();
	connection.query(sql, function(err, rows, feild) {
		if(!err) {
			var libs = {
				data:rows
			}
			res.end(JSON.stringify(libs));
		} else {
            res.end(JSON.stringify(err));
		}
	});
	connection.end();
})