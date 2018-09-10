const { gql } = require('apollo-server-express');
const { head, partition, find, filter } = require('lodash');

const typeDefs = gql`
  type PlayerGame {
    id: String
    type: String
  }

  type MatchInfo {
    name: String
    playerId: String
    date: String
    time: String
    matchDuration: Int
    gameMode: String
    mapName: String
    teams: Int
    participants: Int
    rank: Int
    kills: Int
    assists: Int
    DBNOs: Int
    boosts: Int
    allHeals: Int
    damage: Int
    headshotKills: Int
    killPlace: Int
    longestKill: Int
    revives: Int
    rideDistance: Int
    roadKills: Int
    swimDistance: Int
    teamKills: Int
    timeSurvived: Int
    vehiclesDestroyed: Int
    walkDistance: Int
  }

  type Query {
    playerGames(region: String!, playerName: String!): [PlayerGame]
    matchInfo(region: String!, matchId: String!, playerId: String!): MatchInfo
    matchesInfo(
      region: String!
      matchesId: [String!]!
      playerId: String!
    ): [MatchInfo]
    playerId(region: String!, playerName: String!): ID!
  }
`;

const getMatchInfo = async ({ dataSources, region, matchId, playerId }) => {
  const matchInfo = await dataSources.pubgAPI.getMatch(region, matchId);
  const matchData = JSON.parse(matchInfo);
  const {
    included,
    data: {
      attributes: { createdAt, duration, gameMode, mapName }
    }
  } = matchData;

  let [date, time] = createdAt.split('T');
  time = time.slice(0, -1);

  const [participantsList, rest] = partition(included, ['type', 'participant']);
  const rosters = head(partition(rest, ['type', 'roster']));

  const participant = find(
    participantsList,
    ({
      attributes: {
        stats: { playerId: id }
      }
    }) => id === playerId
  );

  const {
    id: participantId,
    attributes: {
      stats: {
        winPlace: rank,
        kills,
        assists,
        DBNOs,
        boosts,
        heals,
        damageDealt,
        headshotKills,
        killPlace,
        longestKill: longestkill,
        name,
        revives,
        rideDistance: driveDistance,
        roadKills,
        swimDistance: swimmingDistance,
        teamKills,
        vehicleDestroys: vehiclesDestroyed,
        timeSurvived: timeAlive,
        walkDistance: walkingDistance
      }
    }
  } = participant;

  const teamIds = find(
    rosters,
    ({
      relationships: {
        participants: { data: teamIds }
      }
    }) => !!find(teamIds, ({ id }) => id === participantId)
  ).relationships.participants.data;

  const teamStats = filter(
    participantsList,
    ({ id }) => !!find(teamIds, ({ id: teamId }) => teamId === id)
  );

  const teams = rosters.length;
  const participants = participantsList.length;
  const allHeals = boosts + heals;
  const damage = parseInt(damageDealt, 10);
  const longestKill = parseInt(longestkill, 10);
  const rideDistance = parseInt(driveDistance, 10);
  const swimDistance = parseInt(swimmingDistance, 10);
  const walkDistance = parseInt(walkingDistance, 10);
  const timeSurvived = parseInt(timeAlive / 60, 10);
  const matchDuration = parseInt(duration / 60, 10);

  return {
    date,
    time,
    matchDuration,
    gameMode,
    mapName,
    teams,
    participants,
    rank,
    kills,
    assists,
    DBNOs,
    allHeals,
    damage,
    headshotKills,
    killPlace,
    longestKill,
    name,
    playerId,
    revives,
    rideDistance,
    roadKills,
    swimDistance,
    teamKills,
    vehiclesDestroyed,
    walkDistance,
    timeSurvived
  };
};

const resolvers = {
  Query: {
    playerId: async (root, { region, playerName }, { dataSources }) => {
      const information = await dataSources.pubgAPI.getPlayerGames(
        region,
        playerName
      );

      const playerInfo = head(information.data);

      const { id } = playerInfo;

      return id;
    },
    playerGames: async (root, { region, playerName }, { dataSources }) => {
      const information = await dataSources.pubgAPI.getPlayerGames(
        region,
        playerName
      );

      const playerInfo = head(information.data);

      const {
        relationships: {
          matches: { data: matchesArray }
        }
      } = playerInfo;

      return matchesArray;
    },
    matchInfo: async (root, { region, matchId, playerId }, { dataSources }) =>
      getMatchInfo({ dataSources, region, matchId, playerId }),
    matchesInfo: async (
      root,
      { region, matchesId, playerId },
      { dataSources }
    ) =>
      matchesId.map(matchId =>
        getMatchInfo({ dataSources, region, matchId, playerId })
      )
  }
};

module.exports = {
  resolvers,
  typeDefs
};
