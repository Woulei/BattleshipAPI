'use strict';

// src/services/game/hooks/joinGame.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');
const isGameFull = require('../isGameFull');

module.exports = function(options) {
  return function(hook) {
    return hook.app.service('games').get(hook.id)
      .then((game) => {
        if (hook.data.joinGame === undefined) {
          return;
        }

        // See Feathers code for available error types
        // https://github.com/feathersjs/feathers-errors/blob/master/src/index.js

        const action = hook.data.joinGame === 'true' ? '$addToSet' : '$pull';
        if (action === '$addToSet'){
          if (isGameFull(game)) {
            throw new errors.Unprocessable('Sorry, this game is full!');
          }
        }
        let data = {};
        data[action] = { playerIds: hook.params.user._id };
        hook.data = data;
      })
  }
}
