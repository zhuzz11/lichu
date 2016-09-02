angular.module("lichu").controller('writeBookCtrl', ['$scope', '$state', '$http', 'apis', 'popupService',function($scope, $state, $http, apis, popupService) {

  $scope.books = {
    bookcontent: "",
    title: ""
  };
  $(".book-textarea").bind("keydown keyup",function(){
   $(this).autosize();
  }).show().autosize();

  $scope.uploadbook = function() {
    // Setup the loader
    var body = {
      content: $scope.books.bookcontent,
      title: $scope.books.title
    };
    if(body.content.trim() === "" || body.content.length < 10){
      popupService.fail("内容长度太少，不能低于10个有效字符。");
      return;
    }
    apis.uploadBook.send(null, body, "正在发表...").then(function(result) {
      if (result.resultCode == "000") {
        $state.go('mybook');
      } else {
        popupService.fail(result.msg);
      }
    }, function() {
      popupService.fail("发表失败，稍后重试。");
    });
  };

}]);