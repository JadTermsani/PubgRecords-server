const { head, partition, find, filter } = require('lodash');

const getMatchInfo = async (dataSources, region, matchId, playerId) => {
  const information = await dataSources.pubgAPI.getMatch(region, matchId);
  const matchData = JSON.parse(information);

  const {
    included,
    data: {
      attributes: { createdAt, duration, gameMode, mapName }
    }
  } = matchData;
  let matchDuration, teams, participants, userRank;
  let [date, time] = createdAt.split('T');
  time = time.slice(0, -1);

  const [participantsList, rest] = partition(included, ['type', 'participant']);
  const rosters = head(partition(rest, ['type', 'roster']));
  const test = head(partition(rest, ['type', 'asset']));

  const {
    attributes: { URL: telemetryUrl }
  } = head(test);

  const participant = find(
    participantsList,
    ({
      attributes: {
        stats: { playerId: id }
      }
    }) => id === playerId
  );

  const { id: participantId } = participant;

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
  ).map(participant => {
    const {
      attributes: {
        stats: {
          winPlace: rank,
          kills,
          assists,
          DBNOs,
          boosts,
          heals: Heals,
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
    const heals = boosts + Heals;
    const damage = parseInt(damageDealt, 10);
    const longestKill = parseInt(longestkill, 10);
    const rideDistance = parseInt(driveDistance, 10);
    const swimDistance = parseInt(swimmingDistance, 10);
    const walkDistance = parseInt(walkingDistance, 10);
    const timeSurvived = parseInt(timeAlive / 60, 10);
    matchDuration = parseInt(duration / 60, 10);
    teams = rosters.length;
    participants = participantsList.length;
    userRank = rank;
    return {
      rank,
      kills,
      assists,
      DBNOs,
      heals,
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
  });

  return {
    playersInfo: teamStats,
    generalInfo: {
      gameMode,
      time,
      date,
      matchDuration,
      mapName,
      teams,
      participants,
      userRank,
      telemetryUrl
    }
  };
};

module.exports = {
  getMatchInfo
};
