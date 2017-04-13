'use strict'

module.exports = function validFire(board, cellIndex, boardIndex) {
  return board[boardIndex][cellIndex] === 1 || board[boardIndex][cellIndex] === 3
}
