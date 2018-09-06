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
  }

  type Query {
    playerGames(region: String!, playerName: String!): [PlayerGame]
    matchInfo(region: String!, matchId: String!, playerId: String!): MatchInfo
  }
`;

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
    matchInfo: async (root, { region, matchId, playerId }, { dataSources }) => {
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

      const [participantsList, rest] = partition(included, [
        'type',
        'participant'
      ]);
      const rosters = head(partition(rest, ['type', 'roster']));

      const participantId = find(
        participantsList,
        ({
          attributes: {
            stats: { playerId: id }
          }
        }) => id === playerId
      ).id;

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
        participants
      };
    }
  }
};

module.exports = {
  resolvers,
  typeDefs
};
