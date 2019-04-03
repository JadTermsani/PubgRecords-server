const { reduce, values } = require('lodash');

const getSeasonStats = information => {
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
        teamKills: accum.teamKills ? accum.teamKills + teamKills : teamKills,
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
            ? Math.max(accum.longestGame, longestTimeSurvived / 60)
            : longestTimeSurvived / 60,
          10
        )
      };
    },
    {}
  );

  return summed;
};

module.exports = {
  getSeasonStats
};
