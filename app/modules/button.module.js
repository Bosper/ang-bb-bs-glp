import angularBootstrap from 'angular-bootstrap-npm';

angular.module('button.module', [ 'ui.bootstrap' ]).controller('ButtonsCtrl', function ($scope) {
  $scope.singleModel = 0;

  $scope.radioModel = 'Middle';

  $scope.checkModel = {
    left: false,
    middle: true,
    right: false
  };

  $scope.checkResults = [];

  $scope.$watchCollection('checkModel', function () {
    $scope.checkResults = [];
    angular.forEach($scope.checkModel, function (value, key) {
      if (value) {
        $scope.checkResults.push(key);
      }
    });
  });
});
