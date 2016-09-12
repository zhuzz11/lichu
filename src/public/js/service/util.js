angular.module("lichu").factory("util", [function() {
	var map = {};
	var setter = function(key,object){
		map[key] = object;
	};

	var getter = function(key){
		return map[key];
	}
	return {
		format2html: function(text) {
			return text.replace(/\n/gm, "<br/>").replace(/\s/gm, "&nbsp");
		},
		set: setter,
		get: getter
	};
}]);