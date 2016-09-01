angular.module("lichu").controller('detailBookCtrl', ['$scope', '$stateParams', 'apis', 'popupService',function($scope, $stateParams, apis, popupService) {
	var id = $stateParams.bookId;

	apis.getDetailBookbyId.send({
		id: id
	}, null).then(function(result) {
		if (result.resultCode == "000") {
			$scope.item = result.resultObject;
		} else {
			popupService.fail(result.msg);
		}
	});
}]);