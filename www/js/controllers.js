angular.module('expenses-app')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the config modal
  $scope.config = {};

  // Create the config modal that we will use later
  $ionicModal.fromTemplateUrl('templates/config-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the config modal to close it
  $scope.closeConfig = function() {
    $scope.modal.hide();
  };

  // Open the config modal
  $scope.lauchConfig = function() {
    $scope.modal.show();
  };

  // Perform the config action when the user submits the config form
  $scope.commitConfig = function() {
    console.log('Committing configs', $scope.config);

    // Simulate a test delay.
    $timeout(function() {
      $scope.closeConfig();
    }, 1000);
  };
})

.controller('AddExpenseCtrl', function($scope) {
})

.controller('AddExpenseFromPictureCtrl', function($scope) {
});
