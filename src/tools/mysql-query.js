var mysql = require("mysql");

var config = require("../config.json");//全局变量
var envConfig = process.argv[3];
//var connection = require("./mysql-connect");
var Q = require('q');

var config = {
	host: config[envConfig].db.host,
    port: config[envConfig].db.port,
	user: config[envConfig].db.user,
    password: config[envConfig].db.password,
	database: config[envConfig].db.database
};

var connection;

function connectHandler() {
	connection = mysql.createConnection(config);
	connection.connect(function(err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}

		console.log('connected as id ' + connection.threadId);
	});
}

module.exports = {
	query: function(sql,arr) {

		console.log("sql === " + sql);
		var deferred = Q.defer();

		connectHandler();

		connection.query(sql, arr, function(err, rows) {
			// And done with the connection.
			if (err) {
				deferred.reject(err);
				throw err;

			}
			deferred.resolve(rows);
			// Don't use the connection here, it has been returned to the pool.
		});

		connection.end();
		return deferred.promise;
	}
};