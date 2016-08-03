var mysql = require("mysql");

//var connection = require("./mysql-connect");
var Q = require('q');

var config = {
	host:"localhost",
	port:"3306",
	user:"zdm",
	password:"199112",
	database:"myweb"
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
		    if(rows)
				console.log('The solution is:== ', JSON.stringify(rows));
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

			console.log('The result is: ', result);
			deferred.resolve(result);
		    // Don't use the connection here, it has been returned to the pool.
		 });

		connection.end();
		return deferred.promise;
	}

}