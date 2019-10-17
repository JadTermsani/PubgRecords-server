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
    team: [String]
    matchId: String
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

  type LifetimeStats {
    assists: Int
    heals: Int
    kills: Int
    dBNOs: Int
    deaths: Int
    damage: Int
    headshotKills: Int
    longestKill: Float
    longestGame: Int
    revives: Int
    roadKills: Int
    roundMostKills: Int
    rounds: Int
    suicides: Int
    runningDistance: Int
    swimDistance: Int
    drivingDistance: Int
    teamKills: Int
    timePlayed: Int
    top10s: Int
    vehiclesDestroyed: Int
    weaponsAcquired: Int
    wins: Int
    kdRatio: Float
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
    playerCoords: [Coordinates]
    safetyZoneCoords: [ZoneCoords]
    redZoneCoords: [ZoneCoords]
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

  type ZoneCoords {
    x: Float
    y: Float
    radius: Float
  }

  type weaponStats {
    kills: Int
    defeats: Int
    roundMostKills: Int
    roundMostDamage: Float
    damage: Float
    headshots: Int
    roundMostHeadshots: Int
    knocks: Int
    roundMostKnocks: Int
    longRangeKills: Int
    longestKill: Float
    roundMostDefeats: Int
    xpTotal: Int
    levelCurrent: Int
    tierCurrent: Int
  }

  type weaponMedals {
    medalId: String
    count: Int
  }

  type weaponMastery {
    name: String
    stats: weaponStats
    medals: [weaponMedals]
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

    getLifetimeStats(region: String!, playerId: String!): LifetimeStats
    weaponMastery(region: String!, playerId: String!): [weaponMastery]
  }
`;

module.exports = {
  typeDefs
};
