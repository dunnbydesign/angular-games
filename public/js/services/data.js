/* globals angular */

'use strict'

angular.module('sportsCentreApp').service('dataService', ['$http', function ($http) {
  this.getGames = function (addGamesToScope) {
    $http.get('/games/list').then(addGamesToScope)
  }

  this.saveNewGame = function (game, addNewGameToScope) {
    $http.post('/games', game, { headers: { 'Content-Type': 'application/json' } }).then(addNewGameToScope)
  }

  this.deleteGame = function (game, index, removeGameFromScope) {
    $http.delete('/games/' + game._id).then(function () {
      removeGameFromScope(index)
    })
  }

  this.showGameDetails = function (game) {
    $http.get('/games/' + game._id).then()
  }
}])
