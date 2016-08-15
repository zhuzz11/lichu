angular.module("lichu").controller('detailBookCtrl', ['$scope', '$stateParams','apis',function($scope, $stateParams,apis) {
  var id = $stateParams.bookId;
  console.log(id);
  
  apis.getDetailBookbyId.send({id:id},null).then(function(data){
       console.log(data);
        $scope.item = data[0];
  });
}])