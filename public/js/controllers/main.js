/* globals angular */

'use strict'

angular.module('sportsCentreApp').controller('mainCtrl', ['$scope', 'dataService', function ($scope, dataService) {
  var addGamesToScope = function (response) {
    $scope.games = response.data
  }

  dataService.getGames(addGamesToScope)

  var addNewGameToScope = function (response) {
    $scope.games.push(response.data)
    $scope.game = {
      homeScore: 0,
      awayScore: 0,
      played: 'false'
    }
  }

  $scope.saveNewGame = function (game) {
    dataService.saveNewGame(game, addNewGameToScope)
  }

  var removeGameFromScope = function (index) {
    $scope.games.splice(index, 1)
  }

  $scope.deleteGame = function (game, index) {
    dataService.deleteGame(game, index, removeGameFromScope)
  }

  $scope.showGameDetails = function (game) {
    dataService.showGameDetails()
  }
}])
