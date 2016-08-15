angular.module("lichu").controller('bookListCtrl', ['$scope', '$state', '$http', 'apis',function($scope, $state, $http, apis) {

  $scope.gotoWrite = function() {
    $state.go('writeBook');
  };
  $scope.gotoDetail = function(item) {
    $state.go('detailBook', {
      bookId: item.id
    });
  };


  apis.getBooks.send(null, null).then(function(data) {
    console.log(data);
    $scope.books = data;
  }, function() {
    console.log("err=====");
  });

}]);