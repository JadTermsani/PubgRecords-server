const { getPlayerId } = require('./playerId');
const { getPlayerGames } = require('./playerGames');
const { getMatchInfo } = require('./matchInfo');
const { getSeasonStats } = require('./getSeasonStats');
const { getLeaderboards } = require('./leaderboards');
const { getTelemetryData } = require('./telemetry');
const { getLifetimeStats } = require('./getLifetimeStats');
const { getWeaponMastery } = require('./weaponMastery');

module.exports = {
  getPlayerId,
  getPlayerGames,
  getMatchInfo,
  getSeasonStats,
  getLeaderboards,
  getTelemetryData,
  getLifetimeStats,
  getWeaponMastery
};
