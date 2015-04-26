angular.module('expenses-app', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.add-expense', {
    url: "/add-expense",
    views: {
      'menuContent': {
        templateUrl: "templates/add-expense.html",
        controller: 'AddExpenseCtrl'
      }
    }
  })

  .state('app.add-expense.from-picture', {
    url: "/from-picture",
    views: {
      'menuContent@app': {
        templateUrl: "templates/add-expense/from-picture.html",
        controller: 'AddExpenseFromPictureCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/add-expense');
});
