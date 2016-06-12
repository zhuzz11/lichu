angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('MybookCtrl',function($scope,$state,$http, Books){
  //$scope.books = Books.all();
  $http({
    url:'/books',
    method:'GET'
  }).success(function(data,header,config,status){
    //响应成功
    console.log(data);
    $scope.books = data;
  }).error(function(data,header,config,status){
    //处理响应失败
    console.log("err=====");
  });

  $scope.gotoWrite = function(){
    $state.go('writeBook');
  };
  $scope.gotoDetail = function(item){
    $state.go('detailBook',{data:item});
  };


})

.controller('WritebookCtrl',function($scope,$state,$http,$ionicLoading){

  $scope.books = {
    bookcontent : "",
    title:""
  };
  

  $scope.uploadbook = function(){
    // Setup the loader
    $ionicLoading.show({
      content: '正在上传...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    var data = {
      content: $scope.books.bookcontent,
      name:"lichu",
      title:$scope.books.title
    };
    $http({
      url:'/books/upload',
      method:'POST',
      data:data
    }).success(function(){
      $ionicLoading.hide();
      $state.go('mybook');
    }).error(function(){
      alert("upload error");
    });
  };


})


.controller('DetailbookCtrl',function($scope,$stateParams){
  var item = $stateParams.data;
  console.log(item);
  $scope.item = item;
})





;
