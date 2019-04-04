const getCoordinates = (information, users, scale) => {
  const coordinates = users.map(user => {
    const Arr = information.filter(({ character, common }) =>
      character && common
        ? character.name === user && common.isGame > 0.5
        : false
    );

    const locations = Arr.map(item => {
      const { x, y, z } = item.character.location;
      if (scale) {
        return {
          x: parseInt(x / scale, 10),
          y: parseInt(y / scale, 10),
          z: parseInt(z, 10)
        };
      } else {
        return {
          x: parseInt(x, 10),
          y: parseInt(y, 10),
          z: parseInt(z, 10)
        };
      }
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
