const { head } = require('lodash');

const getPlayerGames = information => {
  const playerInfo = head(information.data);

  const {
    relationships: {
      matches: { data: matchesArray }
    }
  } = playerInfo;

  return matchesArray;
};

module.exports = {
  getPlayerGames
};
