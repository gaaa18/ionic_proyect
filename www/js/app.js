// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider,$urlRouterProvider) {
  $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tab.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.video', {
    url: '/video',
    views: {
      'tab-video': {
        templateUrl: 'templates/video.html',
        controller: 'VideosCtrl'
      }
    }
  })

  .state('tab.comunidad', {
    url: '/comunidad',
    views: {
      'tab-comunidad': {
        templateUrl: 'templates/comunidad.html',
        controller: 'ComunidadCtrl'
      }
    }
  })

  .state('tab.user', {
    url: '/user/:id',
    views: {
      'tab-user': {
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl'
      }
    }
  })

  .state('tab.info',{
    url: '/info',
    views: {
      'info': {
        templateUrl: 'templates/info.html'
      }
    }
  })

    $urlRouterProvider.otherwise('/tab/home');
})

.controller('HomeCtrl', function($scope){
  console.log('Entrando Home');
})

.controller('VideosCtrl',['$scope','$http','$state' ,function ($scope,$http,$state) {
   $http.get('js/data.json')
   .success(function (data) {
      $scope.detalles_videos = data.detalles_videos;
      $scope.data = {showReorder:false};
   });

   $scope.toggleDescripcion = function (item) {
      item.resumido = !item.resumido;
   }

   $scope.moveItem = function (item,fromIndex,toIndex) {
      $scope.detalles_videos.splice(fromIndex,1);
      $scope.detalles_videos.splice(toIndex,0,item);
   }
}])

.controller('ComunidadCtrl', ['$scope','$http','$state', function($scope,$http,$state){
  $http.get('js/data.json')
  .success(function(data){
    $scope.usuarios = data.usuarios;
  });
}])

.controller('UserCtrl', ['$scope','$http','$state', function($scope,$http,$state){
  http.get('js/datos.json')
  .success(function(data){
    $scope.data = data.usuarios[$state.param.id];
  });
}])
