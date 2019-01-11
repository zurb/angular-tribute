import Tribute from 'tributejs/src';

if (typeof Tribute === 'undefined') {
  throw new Error('[AngularTribute] cannot locate tributejs!');
}

const AngularTribute = ($timeout) => ({
  restrict: 'A',
  scope: {
    values: '=',
    options: '=',
    onReplaced: '&',
    onNoMatch: '&'
  },
  controller: ['$scope', function($scope) {
    this.$onDestroy = () => {
      $scope.tribute.hideMenu();
    };
  }],
  compile($element, $attrs) {
    return ($scope, $element, $attrs) => {
      if (typeof $scope.options === 'array') {
        $scope.tribute = new Tribute({
          collection: $scope.options
        });
      } else {
        $scope.tribute = new Tribute(angular.merge({
          values: $scope.values
        }, ($scope.options || {})));
      }

      $scope.tribute.attach($element[0]);

      $element[0].addEventListener("tribute-replaced", (e) => {
        if (typeof $scope.onReplaced !== 'function') return;
        $timeout($scope.onReplaced.apply(this));
      });
      $element[0].addEventListener("tribute-no-match", (e) => {
        if (typeof $scope.onNoMatch !== 'function') return;
        $timeout($scope.onNoMatch.apply(this));
      });

      $scope.$on('$destroy', () => {
        $scope.tribute.detach($element[0]);
      });
    }
  }
});

AngularTribute.$inject = ['$timeout'];

export default AngularTribute;
