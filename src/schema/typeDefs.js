const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type PlayerGame {
    id: String
    type: String
  }

  type MatchesInfo {
    playersInfo: [PlayerInfo]
    generalInfo: GeneralInfo
  }

  type GeneralInfo {
    gameMode: String
    time: String
    date: String
    matchDuration: Int
    mapName: String
    teams: Int
    participants: Int
    userRank: Int
    telemetryUrl: String
  }

  type PlayerInfo {
    name: String
    playerId: String
    rank: Int
    kills: Int
    assists: Int
    DBNOs: Int
    boosts: Int
    heals: Int
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

  type SeasonStats {
    kills: Int
    assists: Int
    deaths: Int
    rounds: Int
    wins: Int
    top10s: Int
    suicides: Int
    teamKills: Int
    kdRatio: Float
    runningDistance: Int
    drivingDistance: Int
    vehiclesDestroyed: Int
    heals: Int
    revives: Int
    damage: Int
    mostKills: Int
    longestKill: Float
    timePlayed: Int
    longestGame: Int
  }

  type Players {
    name: String
    rank: Int
    id: ID!
    stats: Stats
  }

  type Stats {
    rankPoints: Int
    wins: Int
    games: Int
    winRatio: Float
    averageDamage: Int
    kills: Int
    killDeathRatio: Float
    averageRank: Float
  }

  type Telemetry {
    Coordinates: [Coordinates]
  }

  type Coordinates {
    Id: String
    Coords: [Coords]
  }

  type Coords {
    x: Int
    y: Int
    z: Int
  }

  type Query {
    playerGames(region: String!, playerName: String!): [PlayerGame]

    matchInfo(
      region: String!
      matchId: [String!]!
      playerId: String!
    ): MatchesInfo

    matchesInfo(
      region: String!
      matchesId: [String!]!
      playerId: String!
    ): [MatchesInfo]

    playerId(region: String!, playerName: String!): ID!

    leaderboards(gameMode: String!, count: Int!): [Players!]!

    telemetry(url: String!, users: [String!], scale: Int): Telemetry

    getSeasonStats(
      region: String!
      playerId: String!
      season: String!
    ): SeasonStats
  }
`;

module.exports = {
  typeDefs
};
