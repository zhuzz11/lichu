angular.module("lichu").controller('editPwdCtrl', ['$scope', '$state', 'apis', 'popupService', function($scope, $state, apis, popupService) {
  $scope.user = {
    oldpwd: "",
    newpwd: "",
    confirmpwd:""
  };
  $scope.submit = function() {
    if($scope.user.oldpwd == "" || $scope.user.newpwd == "" || $scope.user.confirmpwd == ""){
      popupService.fail("密码不能为空。");
      return;
    }
    if (!/^[a-zA-Z0-9_!@#$%^&*()-\\+]{6,15}$/.test($scope.user.newpwd)) {
      popupService.fail("密码不符规范！");
      return;
    }
    if ($scope.user.newpwd != $scope.user.confirmpwd) {
      popupService.fail("两次输入的密码不一致！");
      return;
    }
    apis.editPwd.send(null,$scope.user).then(function(response){
      if (response.resultCode == "000") {
        popupService.success("修改成功，下次登录请使用新密码。");
        $state.go('myCenter');
      } else {
        popupService.fail(response.msg);
      }
    },function(){
      popupService.fail("服务器超时！");
    });
    
  };

  $scope.forget = function(){
    popupService.fail("暂不支持，请记住密码。");
  };

}]);