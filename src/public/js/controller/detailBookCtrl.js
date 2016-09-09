angular.module("lichu").controller('detailBookCtrl', ['$scope', '$stateParams', 'apis', 'popupService',function($scope, $stateParams, apis, popupService) {
	var id = $stateParams.bookId;

	var formatText = function(text){
		return text.replace(/\n/gm,"<br/>").replace(/\s/gm,"&nbsp");
	};

	apis.getDetailBookbyId.send({
		id: id
	}, null).then(function(result) {
		if (result.resultCode == "000") {
			result.resultObject.content = formatText(result.resultObject.content);
			$scope.item = result.resultObject;
		} else {
			popupService.fail(result.msg);
		}
	});
}]);