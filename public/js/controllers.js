myApp

.controller('MybookCtrl', function($scope, $state, $http, $apis) {

  $scope.gotoWrite = function() {
    $state.go('writeBook');
  };
  $scope.gotoDetail = function(item) {
    $state.go('detailBook', {
      bookId: item.id
    });
  };


  $apis.getBooks.send(null, null).then(function(data) {
    console.log(data);
    $scope.books = data;
  }, function() {
    console.log("err=====");
  });

})

.controller('WritebookCtrl', function($scope, $state, $http, $apis) {

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
    $apis.uploadBook.send(null, body, "正在发表...").then(function(data) {
      if (data.resultCode == "000") {
        $state.go('mybook');
      } else {

      }

    }, function() {
      alert("upload error");
    });
  }

})


.controller('DetailbookCtrl', function($scope, $stateParams,$apis) {
  var id = $stateParams.bookId;
  console.log(id);
  
  $apis.getDetailBookbyId.send({id:id},null).then(function(data){
       console.log(data);
        $scope.item = data[0];
  });
})

.controller('loginCtrl', function($scope, $state, $apis, $ionicLoading) {
  $scope.user = {
    name: "",
    pwd: ""
  };
  $scope.login = function() {
    $apis.login.send(null,$scope.user).then(function(response){
      if (response.resultCode == "000") {
        $state.go('mybook');
      } else {

      }
    },function(){

    })
    
  };
})



;