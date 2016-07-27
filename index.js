'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Tribute = _interopDefault(require('tributejs/src'));

var _this = undefined;

if (typeof Tribute === 'undefined') {
  throw new Error('[AngularTribute] cannot locate tributejs!');
}

var AngularTribute = function AngularTribute($timeout) {
  return {
    restrict: 'A',
    scope: {
      values: '=',
      options: '=',
      onReplaced: '&',
      onNoMatch: '&'
    },
    controller: function controller($scope) {
      _this.$onDestroy = function () {
        $scope.tribute.hideMenu();
      };
    },
    compile: function compile($element, $attrs) {
      var _this2 = this;

      return function ($scope, $element, $attrs) {
        if (typeof $scope.options === 'array') {
          $scope.tribute = new Tribute({
            collection: $scope.options
          });
        } else {
          $scope.tribute = new Tribute(angular.merge({
            values: $scope.values
          }, $scope.options || {}));
        }

        $scope.tribute.attach($element[0]);

        $element[0].addEventListener("tribute-replaced", function (e) {
          $timeout($scope.onReplaced.apply(_this2));
        });
        $element[0].addEventListener("tribute-no-match", function (e) {
          $timeout($scope.onReplaced.apply(_this2));
        });
      };
    }
  };
};

AngularTribute.$inject = ['$timeout'];

module.exports = AngularTribute;
