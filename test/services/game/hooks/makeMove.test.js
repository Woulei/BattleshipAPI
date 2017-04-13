'use strict';

const assert = require('assert');
const makeMove = require('../../../../src/services/game/hooks/makeMove.js');

describe('game makeMove hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    makeMove()(mockHook);

    assert.ok(mockHook.makeMove);
  });
});
