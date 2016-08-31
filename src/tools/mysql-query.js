var mysql = require("mysql");

//var connection = require("./mysql-connect");
var Q = require('q');

var config = {
	host:"112.74.183.125",
	port:"3306",
	user:"zdm",
	password:"199112",
	database:"myweb-dev"
};
var connection;

function connectHandler(){
	connection = mysql.createConnection(config);
	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }

	  console.log('connected as id ' + connection.threadId);
	});
};

module.exports = {
	query : function(sql){

		console.log("sql === " + sql);
		var deferred = Q.defer();

		connectHandler();

		connection.query(sql, function(err, rows) {
		    // And done with the connection.
		    if (err){
		    	deferred.reject(err);
		    	throw err;

		    }
			deferred.resolve(rows);
		    // Don't use the connection here, it has been returned to the pool.
		 });

		connection.end();
		return deferred.promise;
	},
	insert: function(sql){
		console.log("sql === " + sql);
		var deferred = Q.defer();

		connectHandler();

		connection.query(sql, function(err, result) {
		    // And done with the connection.
		    if (err){
		    	deferred.reject(err);
		    	throw err;

		    }
			deferred.resolve(result);
		    // Don't use the connection here, it has been returned to the pool.
		 });

		connection.end();
		return deferred.promise;
	}

}