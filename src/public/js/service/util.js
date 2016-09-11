angular.module("lichu").factory("util", [function() {
	return {
		format2html: function(text) {
			return text.replace(/\n/gm, "<br/>").replace(/\s/gm, "&nbsp");
		}
	};
}]);