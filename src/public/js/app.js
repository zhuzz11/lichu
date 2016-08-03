// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('lichu', ['ui.router', 'ionic'])
  .run(["$ionicPlatform",
    "$apiservice",
    function($ionicPlatform,$apiservice) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)

        $apiservice.init(); //初始化api请求
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    }
  ])

.config(["$stateProvider","$urlRouterProvider",function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('mybook', {
    url: '/mybook',
    cache: false,
    templateUrl: 'templates/my-book.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html'
  })

  .state('writeBook', {
      url: '/writebook',
      cache: false,
      templateUrl: 'templates/write-book.html'
    })
    .state('detailBook', {
      url: '/detailbook/:bookId',
      cache: false,
      templateUrl: 'templates/detail-book.html'
    })

  ;

  $urlRouterProvider.otherwise('/mybook');

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');

}]);