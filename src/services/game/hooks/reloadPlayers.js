'use strict';

// src/services/game/hooks/reloadPlayers.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const gameWon = require('../gameWon');
const defaults = {};


module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    if (hook.data.makeMove) {
      const { result } = hook;

      const winner = gameWon(hook)
      if (winner > -1) result.winner = winner
    }
  }
};
