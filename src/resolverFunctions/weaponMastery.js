const { map } = require('lodash');

const getWeaponMastery = information => {
  const {
    data: {
      attributes: { weaponSummaries }
    }
  } = information;

  let mastery = [];
  let obj;

  map(weaponSummaries, (weapon, key) => {
    obj = {};
    const { XPTotal, LevelCurrent, TierCurrent, Medals, StatsTotal } = weapon;
    const {
      Kills,
      MostDefeatsInAGame,
      Defeats,
      MostDamagePlayerInAGame,
      DamagePlayer,
      MostHeadShotsInAGame,
      HeadShots,
      LongestDefeat,
      LongRangeDefeats,
      MostKillsInAGame,
      Groggies,
      MostGroggiesInAGame
    } = StatsTotal;

    obj.name = key;

    obj.medals = Medals.map(medal => {
      const { MedalId, Count } = medal;
      return {
        medalId: MedalId,
        count: Count
      };
    });

    obj.stats = {
      kills: Kills,
      defeats: Defeats,
      roundMostKills: MostKillsInAGame,
      roundMostDamage: MostDamagePlayerInAGame.toFixed(2),
      damage: DamagePlayer.toFixed(2),
      headshots: HeadShots,
      roundMostHeadshots: MostHeadShotsInAGame,
      knocks: Groggies,
      roundMostKnocks: MostGroggiesInAGame,
      longRangeKills: LongRangeDefeats,
      longestKill: LongestDefeat.toFixed(2),
      roundMostDefeats: MostDefeatsInAGame,
      xpTotal: XPTotal,
      levelCurrent: LevelCurrent,
      tierCurrent: TierCurrent
    };

    mastery.push(obj);
  });

  return mastery;
};

module.exports = {
  getWeaponMastery
};
