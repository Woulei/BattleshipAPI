'use strict';

// src/services/game/hooks/makeMove.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');
const validFire = require('../validFire');

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

        if (!validFire(board, cellIndex, boardIndex)) {
          console.log('Player tries to make an unvalid move... IDIOT');
          throw new errors.NotAcceptable('Those coordinates are not available.');
          return;
        }
        console.log("Yeahh.. You are allowed to make a move!");

        //do move

      })
  }
}
