angular.module("lichu").controller('writeBookCtrl', ['$scope', '$state', '$http', 'apis',function($scope, $state, $http, apis) {

  $scope.books = {
    bookcontent: "",
    title: ""
  };


  $scope.uploadbook = function() {
    // Setup the loader
    var body = {
      content: $scope.books.bookcontent,
      name: "lichu",
      title: $scope.books.title
    };
    apis.uploadBook.send(null, body, "正在发表...").then(function(data) {
      if (data.resultCode == "000") {
        $state.go('mybook');
      } else {

      }

    }, function() {
      alert("upload error");
    });
  }

}]);