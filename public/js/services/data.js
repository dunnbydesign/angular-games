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

  // $('.save-game').click(function () {
  //   $.ajax({
  //     url: '/games',
  //     method: 'POST',
  //     data: {
  //       sport: $('select[name="sport"]').val(),
  //       homeTeam: $('input[name="homeTeam"]').val(),
  //       awayTeam: $('input[name="awayTeam"]').val(),
  //       homeScore: $('input[name="homeScore"]').val(),
  //       awayScore: $('input[name="awayScore"]').val(),
  //       date: $('input[name="date"]').val(),
  //       played: $('input[name="played"]:checked').val()
  //     }
  //   }).done(function (message) {
  //     if (message) {
  //       $('.error-message').remove()
  //
  //       var $messageHeader = $('<p>').addClass('error-message').text(message.header + ':')
  //       var $errorList = $('<ul>').addClass('error-message')
  //       message.errors.forEach(function (element) {
  //         $('<li>').text(element).appendTo($errorList)
  //       })
  //       $('.add-game')
  //         .append($messageHeader)
  //         .append($errorList)
  //     } else document.location.reload()
  //   })
  // })
}])
