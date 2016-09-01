angular.module("lichu").filter("titleFilter", [function() {
	return function(input) {
		if(input){
			if (input.title.trim() === "") {
				return input.date;
			} else {
				return input.title;
			}
		}
	};
}]);