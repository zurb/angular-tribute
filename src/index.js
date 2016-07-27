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
  controller: function($scope) {
    this.$onDestroy = () => {
      $scope.tribute.hideMenu();
    };
  },
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
        $timeout($scope.onReplaced.apply(this));
      });
      $element[0].addEventListener("tribute-no-match", (e) => {
        $timeout($scope.onReplaced.apply(this));
      });
    }
  }
});

AngularTribute.$inject = ['$timeout'];

export default AngularTribute;
