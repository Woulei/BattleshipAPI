'use strict'

module.exports = function gameWon(hook) {
  if (hook.data.board[0].indexOf(3) === -1) {
    return 1
  }

  if (hook.data.board[1].indexOf(3) === -1) {
    return 0
  }
  return -1
}
