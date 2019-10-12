const {
  getPlayerId,
  getPlayerGames,
  getSeasonStats,
  getLeaderboards,
  getCoordinates,
  getMatchInfo,
  getLifetimeStats
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

    leaderboards: async (root, { gameMode, count }, { dataSources }) => {
      const information = await dataSources.pubgAPI.getLeaderboards(gameMode);

      return getLeaderboards(information, count);
    },

    telemetry: async (root, { url, users, scale }, { dataSources }) => {
      const information = await dataSources.pubgAPI.getTelemetryData(url);

      const coordinates = getCoordinates(information, users, scale);

      return {
        Coordinates: coordinates
      };
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
