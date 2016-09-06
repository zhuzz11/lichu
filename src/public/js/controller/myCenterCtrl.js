angular.module("lichu").controller("myCenterCtrl", ['apis','$scope', '$state', 'popupService', function(apis,$scope, $state, popupService) {
	$scope.logout = function() {
		popupService.confirm("确定退出？").then(function(option) {
			if (option) {
				apis.logout.send(null,null).then(function(result){
					if(result && result.resultCode == "000"){
						$state.go("login");
					}
				},function(){
					popupService.fail("网络异常，稍后重试。")
				})
			}
		});
	};
	$scope.manage = function() {
		popupService.fail("暂未开发")
	};
	$scope.setting = function() {
		popupService.fail("暂未开发")
	};
	$scope.edit = function() {
		popupService.fail("暂未开发")
	};
}]);