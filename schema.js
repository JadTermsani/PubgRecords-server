const { gql } = require('apollo-server-express');
const { head, partition, find, filter } = require('lodash');

const typeDefs = gql`
  type PlayerGame {
    id: String
    type: String
  }

  type MatchInfo {
    date: String
    time: String
    duration: String
    gameMode: String
    mapName: String
    teams: Int
    participants: Int
    rank: Int
  }

  type Query {
    playerGames(region: String!, playerName: String!): [PlayerGame]
    matchInfo(region: String!, matchId: String!, playerId: String!): MatchInfo
    matchesInfo(
      region: String!
      matchesId: [String!]!
      playerId: String!
    ): [MatchInfo]
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
      stats: { winPlace: rank }
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

  return {
    date,
    time,
    duration,
    gameMode,
    mapName,
    teams,
    participants,
    rank
  };
};

const resolvers = {
  Query: {
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
