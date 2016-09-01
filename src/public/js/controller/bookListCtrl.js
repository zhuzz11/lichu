angular.module("lichu").controller('bookListCtrl', ['$scope', '$state', '$http', 'apis','popupService',function($scope, $state, $http, apis, popupService) {

  $scope.gotoWrite = function() {
    $state.go('writeBook');
  };
  $scope.gotoDetail = function(item) {
    $state.go('detailBook', {
      bookId: item.id
    });
  };
  $scope.noMore = false;
  $scope.books = [];
  $scope.page = 1;

  $scope.loadMore = function(){
    getPage($scope.page);
  };

  var getPage = function(page){
    var body = {
      page: page
    };
    apis.getBooks.send(null, body).then(function(result) {
      if(result && result.resultCode == "000"){
        if(result.resultObject.length < 10){
          $scope.noMore = true;
        }
        $scope.books = $scope.books.concat(result.resultObject);
        $scope.page ++;
      }else{
        result && popupService.fail(result.msg);
      }
      
    }, function() {
      popupService.fail("连接超时。");
    });
  };

  getPage($scope.page);
  

}]);