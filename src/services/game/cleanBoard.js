'use strict'

module.exports = function cleanBoard(data, connection, hook) {
  if (!connection.user) {
    return false;
  }

  console.log('\nconnection.user._id:', connection.user._id);
  console.log('type of _id:', typeof(connection.user._id));
  const userId = connection.user._id.toString();
  const players = hook.playerIds.map((el) => { return el.toString() });
  console.log('\nuserId:', userId);
  console.log('type of a userId:', typeof(players[0]));

  return data
};
