angular.module("lichu").controller('loginCtrl', ['$scope', '$state', 'apis', '$ionicLoading',function($scope, $state, apis, $ionicLoading) {
  $scope.user = {
    name: "",
    pwd: ""
  };
  $scope.login = function() {
    apis.login.send(null,$scope.user).then(function(response){
      if (response.resultCode == "000") {
        $state.go('mybook');
      } else {

      }
    },function(){

    })
    
  };
}])