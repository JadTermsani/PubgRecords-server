const getCoordinates = (information, users) => {
  const coordinates = users.map(user => {
    const Arr = information.filter(({ character, common }) =>
      character && common
        ? character.name === user && common.isGame > 0.5
        : false
    );

    const locations = Arr.map(item => {
      const { x, y, z } = item.character.location;
      return {
        x: parseInt(x / 1000, 10),
        y: parseInt(y / 1000, 10),
        z: parseInt(z, 10)
      };
    });

    return {
      Id: user,
      Coords: locations
    };
  });

  return coordinates;
};

module.exports = {
  getCoordinates
};
