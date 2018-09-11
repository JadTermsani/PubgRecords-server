const { gql } = require('apollo-server-express');
const { head, partition, find, filter, values, reduce } = require('lodash');

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

  type Query {
    playerGames(region: String!, playerName: String!): [PlayerGame]
    matchInfo(region: String!, matchId: String!, playerId: String!): MatchInfo
    matchesInfo(
      region: String!
      matchesId: [String!]!
      playerId: String!
    ): [MatchInfo]
    playerId(region: String!, playerName: String!): ID!
    getSeasonStats(
      region: String!
      playerId: String!
      season: String!
    ): SeasonStats
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

      const {
        data: {
          attributes: { gameModeStats }
        }
      } = information;

      const summed = reduce(
        values(gameModeStats),
        (
          accum,
          {
            kills,
            assists,
            losses,
            roundsPlayed,
            wins,
            top10s,
            suicides,
            teamKills,
            walkDistance,
            rideDistance,
            vehicleDestroys,
            heals,
            revives,
            damageDealt,
            roundMostKills,
            longestKill,
            timeSurvived,
            longestTimeSurvived,
            boosts
          },
          idx,
          arr
        ) => {
          return {
            kills: accum.kills ? accum.kills + kills : kills,
            assists: accum.assists ? accum.assists + assists : assists,
            deaths: accum.deaths ? accum.deaths + losses : losses,
            rounds: accum.rounds ? accum.rounds + roundsPlayed : roundsPlayed,
            wins: accum.wins ? accum.wins + wins : wins,
            top10s: accum.top10s ? accum.top10s + top10s : top10s,
            suicides: accum.suicides ? accum.suicides + suicides : suicides,
            teamKills: accum.teamKills
              ? accum.teamKills + teamKills
              : teamKills,
            kdRatio: parseFloat(
              idx === arr.length - 1
                ? (accum.kills + kills) / (accum.deaths + losses)
                : 0
            ).toFixed(2),
            runningDistance: parseInt(
              accum.runningDistance
                ? accum.runningDistance + walkDistance
                : walkDistance,
              10
            ),
            drivingDistance: parseInt(
              accum.drivingDistance
                ? accum.drivingDistance + rideDistance
                : rideDistance,
              10
            ),
            vehiclesDestroyed: accum.vehiclesDestroyed
              ? accum.vehiclesDestroyed + vehicleDestroys
              : vehicleDestroys,
            heals: accum.heals ? accum.heals + heals + boosts : heals + boosts,
            revives: accum.revives ? accum.revives + revives : revives,
            damage: parseInt(
              accum.damage ? accum.damage + damageDealt : damageDealt,
              10
            ),
            mostKills: accum.mostKills
              ? Math.max(accum.mostKills, roundMostKills)
              : roundMostKills,
            longestKill: parseFloat(
              accum.longestKill
                ? Math.max(accum.longestKill, longestKill)
                : longestKill
            ).toFixed(2),
            timePlayed: parseInt(
              accum.timePlayed
                ? accum.timePlayed + timeSurvived / 60
                : timeSurvived / 60,
              10
            ),
            longestGame: parseInt(
              accum.longestGame
                ? Math.max(accum.longestGame, longestTimeSurvived)
                : longestTimeSurvived,
              10
            )
          };
        },
        {}
      );

      return summed;
    },
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
