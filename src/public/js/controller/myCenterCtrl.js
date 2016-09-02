angular.module("lichu").controller("myCenterCtrl",['$scope','$state','popupService',function($scope, $state, popupService){
	$scope.logout = function(){
		popupService.fail("暂未开发")
	};
	$scope.manage = function(){
		popupService.fail("暂未开发")
	};
	$scope.setting = function(){
		popupService.fail("暂未开发")
	};
	$scope.edit = function(){
		popupService.fail("暂未开发")
	};
}]);