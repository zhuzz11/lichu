angular.module("lichu").controller('registerCtrl', ['$scope', '$state', 'apis', '$ionicLoading', 'popupService', function($scope, $state, apis, $ionicLoading, popupService) {
  $scope.user = {
    name: "",
    pwd: "",
    confirm_pwd: ""
  };

  $scope.register = function() {
    if ($scope.user.name == "" || $scope.user.pwd == "") {
      popupService.fail("账号或密码不能为空！");
      return;
    } else if ($scope.user.pwd !== $scope.user.confirm_pwd) {
      popupService.fail("两次输入密码不一致！");
      return;
    }
    apis.register.send(null, $scope.user).then(function(response) {
      if (response.resultCode == "000") {
        $state.go('mybook');
      } else {
        console.log(response.msg);
      }
    }, function() {
      popupService.fail("服务器超时！");
    });
  };

}]);