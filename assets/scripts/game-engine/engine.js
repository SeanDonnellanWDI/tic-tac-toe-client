// HEY SEAN!!! Sean, you may edit this file. Don't edit files that don't have this comment at the top. Delete this comment before deliverables are due

'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const gameEvents = require(`./game-api/events`)

const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let arrEX = []
let arrOH = []
let currentGameArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let winner
let currentUserValue = `EX`
let userOnDeck = `OH`
let totalTurns = 0
let gameOn = true

const onPlay = function () {
  // Working
  // gameEvents.onCreateGame()
  // // Working
  // gameEvents.onGetGames()
  console.log(`a`)
  gameEvents.onGetOneGame()
  console.log(`g`)
  // Get currentSpaceValue as a single number by retrieving the space ID and "boiling it down" to the unique number at the end of the ID
  const currentSpaceValue = Number(event.target.id.replace(`moveSpace`, ``))

  // Check if the clicked space already contains an EX or OH. If the space does contain an EX or OH, tell the user it cannot be played. If the space does not contain EX or OH, play the users symbol in that selected space
  // console.log(`The currentUserValue is `, currentUserValue)
  const data = $(event.target).html()
  if ((data === `EX` || data === `OH`) && gameOn === true) {
    $(`#emptyMessage`).html(``)
    const invalidTurn = (`<p>Sorry, this space is already taken, please choose another</p>`)
    $(`#emptyMessage`).append(invalidTurn)
  } else if (gameOn === true) {
    $(`#emptyMessage`).html(``)
    $(`#moveSpace` + currentSpaceValue).html(``)
    const symbol = currentUserValue
    $(`#moveSpace` + currentSpaceValue).append(symbol)
    const validTurn = (`<p>An ${symbol} has been played! Next up: ${userOnDeck}</p>`)
    $(`#emptyMessage`).append(validTurn)

    // ADD THE currentSpaceValue TO arrEX OR arrOH ACCORDING TO WHICH USER PLAYED THIS TURN
    if (currentUserValue === `EX`) {
      arrEX.push(currentSpaceValue)
    } else if (currentUserValue === `OH`) {
      arrOH.push(currentSpaceValue)
    }

    // ADD THE currentUserValue TO currentGameArr[currentSpaceValue]
    currentGameArr[currentSpaceValue] = currentUserValue
    console.log(currentGameArr)

    // Nested totalTurn reevaluation
    totalTurns = totalTurns + 1

    // Nested winner check
    if (totalTurns >= 5) {
      for (let i = 0; i < winningCombos.length; i++) {
        const currentCombo = winningCombos[i]
        const a = currentCombo[0]
        const b = currentCombo[1]
        const c = currentCombo[2]
        if (arrEX.includes(a) === true && arrEX.includes(b) === true && arrEX.includes(c) === true) {
          gameOn = false
          winner = `EX`
          $(`#emptyMessage`).html(``)
          const winningMessage = (`<p>EX wins!</p>`)
          $(`#emptyMessage`).append(winningMessage)
        } else if (arrOH.includes(a) === true && arrOH.includes(b) === true && arrOH.includes(c) === true) {
          gameOn = false
          winner = `OH`
          $(`#emptyMessage`).html(``)
          const winningMessage = (`<p>OH wins!</p>`)
          $(`#emptyMessage`).append(winningMessage)
        }
      }
    }

    // Nested tie check (to be combined with winner check)
    if (totalTurns === 9 && winner === undefined) {
      $(`#emptyMessage`).html(``)
      const tieMessage = (`<p>This game resulted in a tie!</p>`)
      $(`#emptyMessage`).append(tieMessage)
    }

    // Nested turn rotation, so not to accidentally skip turns if
    if (currentUserValue === `EX`) {
      currentUserValue = `OH`
      userOnDeck = `EX`
    } else if (currentUserValue === 'OH') {
      currentUserValue = `EX`
      userOnDeck = `OH`
    }
  }
}

const onReset = function () {
  arrEX = []
  arrOH = []
  currentGameArr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  winner = undefined
  currentUserValue = `EX`
  totalTurns = 0
  gameOn = true
  // Note to self: this can be reduced. Consider a for loop and retrieve $(`#moveSpace[i]`)
  $(`#moveSpace0`).html(``)
  $(`#moveSpace1`).html(``)
  $(`#moveSpace2`).html(``)
  $(`#moveSpace3`).html(``)
  $(`#moveSpace4`).html(``)
  $(`#moveSpace5`).html(``)
  $(`#moveSpace6`).html(``)
  $(`#moveSpace7`).html(``)
  $(`#moveSpace8`).html(``)
  $(`#emptyMessage`).html(``)
}

module.exports = {
  onPlay,
  onReset
}
