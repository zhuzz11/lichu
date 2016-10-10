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
    if ($scope.user.name.length < 1 || $scope.user.name.length > 10) {
      popupService.fail("账号长度不符！");
      return;
    }
    if (!/^[a-zA-Z0-9_!@#$%^&*()-\\+]{6,15}$/.test($scope.user.pwd)) {
      popupService.fail("密码不符规范！");
      return;
    }
    apis.register.send(null, $scope.user).then(function(response) {
      if (response.resultCode == "000") {
        $state.go('mybook');
      } else {
        popupService.fail(response.msg);
      }
    }, function() {
      popupService.fail("服务器超时！");
    });
  };

}]);