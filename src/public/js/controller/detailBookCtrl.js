angular.module("lichu").controller('detailBookCtrl', ['$scope', '$stateParams', 'apis', 'popupService', 'util', function($scope, $stateParams, apis, popupService, util) {
	var id = $stateParams.bookId;
	$scope.item = util.get("book");
	if (!$scope.item) {//保证刷新还是会显示数据
		apis.getDetailBookbyId.send({
			id: id
		}, null).then(function(result) {
			if (result.resultCode == "000") {
				result.resultObject.content = util.format2html(result.resultObject.content);
				$scope.item = result.resultObject;
			} else {
				popupService.fail(result.msg);
			}
		});
	}
}]);