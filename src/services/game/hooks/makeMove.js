'use strict';

// src/services/game/hooks/makeMove.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');

module.exports = function(options) {
  return function(hook) {
    return hook.app.service('games').get(hook.id)
      .then((game) => {
        if (hook.data.makeMove === undefined) {
          console.log("Client doesn't want to make a move");
          return;
        }

        if ( game.playerIds.indexOf(hook.params.user._id) === -1 ){
          console.log("Player isn't in the game");
          throw new errors.Forbidden('You are not in this game!');
        }

      })
  }
}
