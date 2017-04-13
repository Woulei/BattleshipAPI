'use strict'

module.exports = function gameWon(hook) {
  if (hook.data.board[0].indexOf(3) === -1) {
    console.log('Player two is the winner');
    return 1
  }

  if (hook.data.board[1].indexOf(3) === -1) {
    console.log('Player one is the winner');
    return 0
  }
  console.log('There is no winner yet');
  return -1
}
