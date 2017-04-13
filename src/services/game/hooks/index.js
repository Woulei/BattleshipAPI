'use strict';

const reloadPlayers = require('./reloadPlayers');

const makeMove = require('./makeMove');

const firstEncounter = require('./firstEncounter');
const isGameFull = require('./isGameFull');
const joinGame = require('./joinGame');
const createGame = require('./createGame');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [createGame()],
  update: [joinGame(), makeMove()],
  patch: [joinGame(), makeMove()],
  remove: []
};

exports.after = {
  all: [hooks.populate('players', {
    service: 'users',
    field: 'playerIds'
  }), isGameFull(), firstEncounter()],
  find: [],
  get: [],
  create: [],
  update: [reloadPlayers()],
  patch: [reloadPlayers()],
  remove: []
};
