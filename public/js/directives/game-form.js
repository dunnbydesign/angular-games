/* globals angular */

'use strict'

angular.module('sportsCentreApp').directive('gameForm', function () {
  return {
    templateUrl: 'templates/game-form.html',
    controller: 'mainCtrl',
    replace: true,
    restrict: 'E'
  }
})
