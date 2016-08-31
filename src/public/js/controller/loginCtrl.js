angular.module("lichu").controller('loginCtrl', ['$scope', '$state', 'apis', '$ionicLoading','popupService',function($scope, $state, apis, $ionicLoading, popupService) {
  $scope.user = {
    name: "",
    pwd: ""
  };
  $scope.login = function() {
    if($scope.user.name == "" || $scope.user.pwd == ""){
      popupService.fail("账号或密码不能为空。");
      return;
    }
    apis.login.send(null,$scope.user,"正在登陆...").then(function(response){
      if (response.resultCode == "000") {
        $state.go('mybook');
      } else {
        popupService.fail(response.msg);
      }
    },function(){
      popupService.fail("服务器超时！");
    });
    
  };

  $scope.register = function(){
    $state.go("register");
  };
}]);