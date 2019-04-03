const { head } = require('lodash');

const getPlayerId = information => {
  const playerInfo = head(information.data);

  const { id } = playerInfo;

  return id;
};

module.exports = {
  getPlayerId
};
