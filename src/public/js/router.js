angular.module("lichu").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('mybook', {
    url: '/mybook',
    cache: false,
    templateUrl: 'templates/controller/my-book.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/controller/login.html'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/controller/register.html'
  })

  .state('writeBook', {
      url: '/writebook',
      cache: false,
      templateUrl: 'templates/controller/write-book.html'
    })
    .state('detailBook', {
      url: '/detailbook/:bookId',
      cache: false,
      templateUrl: 'templates/controller/detail-book.html'
    })

  ;

  $urlRouterProvider.otherwise('/login');

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');

}]);