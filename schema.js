const { gql } = require('apollo-server-express');
const { head } = require('lodash');

const typeDefs = gql`
  type PlayerGame {
    id: String
    type: String
  }

  type Query {
    playerGames(region: String!, playerName: String!): [PlayerGame]
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
    }
  }
};

module.exports = {
  resolvers,
  typeDefs
};
