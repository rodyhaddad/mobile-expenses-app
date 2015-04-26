'use strict';

angular.module('expenses-app', ['ionic']).run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
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
}).config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  }).state('app.add-expense', {
    url: '/add-expense',
    views: {
      menuContent: {
        templateUrl: 'templates/add-expense.html',
        controller: 'AddExpenseCtrl'
      }
    }
  }).state('app.add-expense.from-picture', {
    url: '/from-picture',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/add-expense/from-picture.html',
        controller: 'AddExpenseFromPictureCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/add-expense');
});
'use strict';

angular.module('expenses-app').controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
  // Form data for the config modal
  $scope.config = {};

  // Create the config modal that we will use later
  $ionicModal.fromTemplateUrl('templates/config-modal.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  // Triggered in the config modal to close it
  $scope.closeConfig = function () {
    $scope.modal.hide();
  };

  // Open the config modal
  $scope.lauchConfig = function () {
    $scope.modal.show();
  };

  // Perform the config action when the user submits the config form
  $scope.commitConfig = function () {
    console.log('Committing configs', $scope.config);

    // Simulate a test delay.
    $timeout(function () {
      $scope.closeConfig();
    }, 1000);
  };
}).controller('AddExpenseCtrl', function ($scope) {}).controller('AddExpenseFromPictureCtrl', function ($scope) {});
'use strict';

angular.module('expenses-app').directive('uwChoosePicture', function () {
    return {
        restrict: 'E',
        template: '\n            <style>\n                uw-choose-picture {\n                    position: absolute;\n                    width: 100%;\n                    height: 100%;\n                    background: rgba(0,0,0,0.05);\n                }\n                uw-choose-picture .choose-picture {\n                    width: 100%;\n                }\n                uw-choose-picture .choose-picture div {\n                    width: 100%;\n                    height: 100%;\n                    font-size: 36px;\n                    color: rgba(124, 124, 124, 0.58);\n                    text-align: center;\n                    line-height: 1.5em;\n                }\n                uw-choose-picture .choose-picture input {\n                    position: absolute;\n                    width: 100%;\n                    height: 100%;\n                    top: 0;\n                    left: 0;\n                    opacity: 0;\n                }\n                uw-choose-picture .choice-done,\n                uw-choose-picture .choice-done ion-scroll {\n                    width: 100%;\n                    height: 100%\n                }\n            </style>\n            <div class="choose-picture" ng-if="!uwChoosePicture.choice">\n                <div class="col">Click to choose and upload the picture of your expense</div>\n                <input type="file" uw-choose-picture-on-choice="uwChoosePicture.onChoice($uwValue)" />\n            </div>\n            <div class="choice-done" ng-if="uwChoosePicture.choice" on-hold="uwChoosePicture.choiceActions()">\n                <ion-scroll zooming="true" direction="xy">\n                    <div>\n                        <img ng-src="{{ uwChoosePicture.choice }}" />\n                    </div>\n                </ion-scroll>\n            </div>\n        ',
        link: function link(scope, el) {
            el.addClass('row').addClass('row-center');
        },
        controller: function controller($ionicActionSheet) {
            var _this = this;

            this.choice = null;
            this.onChoice = function (imageData) {
                _this.choice = imageData;
            };
            this.choiceActions = function () {
                $ionicActionSheet.show({
                    destructiveText: 'Remove Image',
                    destructiveButtonClicked: function destructiveButtonClicked() {
                        _this.choice = null;
                        return true;
                    },
                    cancelText: 'Cancel' });
            };
        },
        controllerAs: 'uwChoosePicture'
    };
}).directive('uwChoosePictureOnChoice', function () {
    return {
        link: function link(scope, el, attrs) {
            el.on('change', function () {
                if (el[0].files[0]) {
                    var reader = new FileReader();

                    reader.onload = function () {
                        scope.$evalAsync(function () {
                            scope.$eval(attrs.uwChoosePictureOnChoice, { $uwValue: reader.result });
                        });
                    };

                    reader.readAsDataURL(el[0].files[0]);
                }
            });
        }
    };
});