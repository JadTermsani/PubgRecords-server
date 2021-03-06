const {
  getPlayerId,
  getPlayerGames,
  getSeasonStats,
  getLeaderboards,
  getTelemetryData,
  getMatchInfo,
  getLifetimeStats,
  getWeaponMastery
} = require('../resolverFunctions');

const resolvers = {
  Query: {
    playerId: async (root, { region, playerName }, { dataSources }) => {
      const information = await dataSources.pubgAPI.getPlayerGames(
        region,
        playerName
      );

      return getPlayerId(information);
    },

    playerGames: async (root, { region, playerName }, { dataSources }) => {
      const information = await dataSources.pubgAPI.getPlayerGames(
        region,
        playerName
      );

      return getPlayerGames(information);
    },

    matchInfo: async (root, { region, matchId, playerId }, { dataSources }) =>
      getMatchInfo(dataSources, region, matchId, playerId),

    getSeasonStats: async (
      root,
      { region, playerId, season },
      { dataSources }
    ) => {
      const information = await dataSources.pubgAPI.getSeason(
        region,
        playerId,
        season
      );

      return getSeasonStats(information);
    },

    getLifetimeStats: async (root, { region, playerId }, { dataSources }) => {
      const information = await dataSources.pubgAPI.getLifetimeStats(
        region,
        playerId
      );
      return getLifetimeStats(information);
    },

    weaponMastery: async (root, { region, playerId }, { dataSources }) => {
      const information = await dataSources.pubgAPI.getWeaponMastery(
        region,
        playerId
      );
      return getWeaponMastery(information);
    },

    leaderboards: async (
      root,
      { gameMode, count, season },
      { dataSources }
    ) => {
      const information = await dataSources.pubgAPI.getLeaderboards(
        gameMode,
        season
      );

      return getLeaderboards(information, count);
    },

    telemetry: async (root, { url, users, scale }, { dataSources }) => {
      const information = await dataSources.pubgAPI.getTelemetryData(url);

      return getTelemetryData(information, users, scale);
    },

    matchesInfo: async (
      root,
      { region, matchesId, playerId },
      { dataSources }
    ) =>
      matchesId.map(matchId =>
        getMatchInfo(dataSources, region, matchId, playerId)
      )
  }
};

module.exports = {
  resolvers
};
