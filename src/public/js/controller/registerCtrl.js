angular.module("lichu").controller('registerCtrl', ['$scope', '$state', 'apis', '$ionicLoading',function($scope, $state, apis, $ionicLoading) {
  $scope.user = {
    name: "",
    pwd: "",
    confirm_pwd:""
  };

  $scope.register = function() {
    if($scope.user.pwd != $scope.user.confirm_pwd){
      return;
    }
    apis.register.send(null,$scope.user).then(function(response){
      if (response.resultCode == "000") {
        $state.go('mybook');
      } else {
        console.log(response.msg);
      }
    },function(){

    })
  };

}])