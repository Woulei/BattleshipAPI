'use strict';

// src/services/game/hooks/makeMove.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');
const validFire = require('../validFire');
const gameWon = require('../gameWon');

module.exports = function(options) {
  return function(hook) {
    return hook.app.service('games').get(hook.id)
      .then((game) => {
        if (hook.data.makeMove === undefined) {
          console.log("Client doesn't want to make a move");
          return;
        }

        const userId = hook.params.user._id.toString();
        const players = game.playerIds.map((el) => { return el.toString() });
        const playerIndex = players.indexOf(userId);

        if ( playerIndex === -1 ){
          throw new errors.Forbidden('You are not in this game!');
          return;
        }

        const cellIndex = hook.data.cell - 1
        const boardIndex = playerIndex === 0 ? 1 : 0
        const board = game.board

        //check if it is the players turn
        const turnId = game.turn;
        console.log("TurnID:", turnId);
        console.log("UserID:", userId);
        if (userId !== turnId) {
          throw new errors.Forbidden('It is not your turn!');
        }

        //check if the cell has already been shot
        if (!validFire(board, cellIndex, boardIndex)) {
          console.log('Player tries to make an unvalid move... IDIOT');
          throw new errors.NotAcceptable('Those coordinates are not available.');
          return;
        }

        //do move
        game.board[boardIndex][cellIndex]++
        hook.data.board = game.board
        console.log("Board updated");

        //update turn data
        if (playerIndex === 0) {
          hook.data.turn = players[1]
        } else {
          hook.data.turn = players[0]
        }

        //check for winner
        const winner = gameWon(hook)
        if (winner > -1) hook.data.winner = winner
      })
  }
}
