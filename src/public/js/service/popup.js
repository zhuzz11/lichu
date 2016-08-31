angular.module("lichu").factory("popupService",["$ionicPopup",function($ionicPopup){
	return {
		success:function(text){
			$ionicPopup.alert({
		       title: '---OK---',
		       template: text
		     });
		},
		fail:function(text){
			$ionicPopup.alert({
		       title: '---Fail---',
		       template: text
		     });
		}
	};
}]);