angular.module("lichu").controller('bookListCtrl', ['$scope', '$state', '$http', 'apis','popupService','util','$ionicScrollDelegate',function($scope, $state, $http, apis, popupService, util, $ionicScrollDelegate) {

  $scope.gotoDetail = function(item) {
    util.set("book",item);
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
        for(var i=0;i<result.resultObject.length;i++){
          var item = result.resultObject[i];
          item.content = item.content.trim();
          item.content = util.format2html(item.content);
        }
        $scope.books = $scope.books.concat(result.resultObject);
        setTimeout(function(){
          $ionicScrollDelegate.resize();
        },500);
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