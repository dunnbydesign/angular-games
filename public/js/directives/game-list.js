/* globals angular */

'use strict'

angular.module('sportsCentreApp').directive('gameList', function () {
  return {
    templateUrl: 'templates/game-list.html',
    controller: 'mainCtrl',
    replace: true
  }
})
