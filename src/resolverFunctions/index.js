const { getPlayerId } = require('./playerId');
const { getPlayerGames } = require('./playerGames');
const { getMatchInfo } = require('./matchInfo');
const { getSeasonStats } = require('./getSeasonStats');
const { getLeaderboards } = require('./leaderboards');
const { getCoordinates } = require('./telemetry');
const { getLifetimeStats } = require('./getLifetimeStats');

module.exports = {
  getPlayerId,
  getPlayerGames,
  getMatchInfo,
  getSeasonStats,
  getLeaderboards,
  getCoordinates,
  getLifetimeStats
};
