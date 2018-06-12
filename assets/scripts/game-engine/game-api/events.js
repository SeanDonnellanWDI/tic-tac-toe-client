// HEY SEAN!!! Sean, you may edit this file. Don't edit files that don't have this comment at the top. Delete this comment before deliverables are due

'use strict'

const gameApi = require(`./api`)
const gameUi = require(`./ui`)

// Working
const onCreateGame = function (event) {
  gameApi.createGame()
    .then(gameUi.createGameSuccess)
    .catch(gameUi.createGameError)
}

// Working
const onGetGames = function (event) {
  gameApi.getGames()
    .then(gameUi.getGamesSuccess)
    .catch(gameUi.getGamesError)
}

module.exports = {
  onCreateGame,
  onGetGames
}
