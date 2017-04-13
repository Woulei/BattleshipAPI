'use strict';

const assert = require('assert');
const reloadPlayers = require('../../../../src/services/game/hooks/reloadPlayers.js');

describe('game reloadPlayers hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    reloadPlayers()(mockHook);

    assert.ok(mockHook.reloadPlayers);
  });
});
