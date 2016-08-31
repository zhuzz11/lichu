angular.module("lichu").controller('bookListCtrl', ['$scope', '$state', '$http', 'apis','popupService',function($scope, $state, $http, apis, popupService) {

  $scope.gotoWrite = function() {
    $state.go('writeBook');
  };
  $scope.gotoDetail = function(item) {
    $state.go('detailBook');
  };

  var init = function(){
    apis.getBooks.send(null, null).then(function(result) {
      if(result && result.resultCode == "000"){
        $scope.books = result.resultObject;
      }else{
        popupService.fail(result.msg);
      }
      
    }, function() {
      popupService.fail("连接超时。");
    });
  }();
  

}]);