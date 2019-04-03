const { sortBy, set } = require('lodash');

const getLeaderboards = (information, count) => {
  const leaders = sortBy(information.included, ['attributes.rank']).slice(
    0,
    count
  );

  return leaders.map(item => {
    set(item, 'attributes.id', item.id);
    set(
      item,
      'attributes.stats.winRatio',
      (item.attributes.stats.winRatio * 100).toFixed(2)
    );
    set(
      item,
      'attributes.stats.killDeathRatio',
      item.attributes.stats.killDeathRatio.toFixed(2)
    );
    set(
      item,
      'attributes.stats.averageRank',
      item.attributes.stats.averageRank.toFixed(2)
    );
    return item.attributes;
  });
};

module.exports = {
  getLeaderboards
};
