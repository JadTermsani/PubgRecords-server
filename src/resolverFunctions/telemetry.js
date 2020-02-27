const { uniqBy } = require('lodash');

const getTelemetryData = (information, users, scale) => {
  const coordinates = users.map(user => {
    const deathMatchFilter = information.filter(({ _T }) =>
      _T ? _T === 'LogMatchDefinition' : false
    );

    const tdm = deathMatchFilter[0].MatchId.includes('tdm');

    const Arr = information.filter(({ character, common }) =>
      character && common
        ? character.name === user &&
          (tdm ? common.isGame === 0 : common.isGame > 0.5)
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

  const safetyZoneCoords = information
    .filter(({ gameState }) => {
      if (gameState) {
        if (gameState.poisonGasWarningPosition.x === 0) {
          return false;
        } else return true;
      } else return false;
    })
    .map(item => {
      const { x, y } = item.gameState.poisonGasWarningPosition;
      const { poisonGasWarningRadius: radius } = item.gameState;

      if (scale) {
        return {
          x: x / scale,
          y: y / scale,
          radius: radius / scale
        };
      } else {
        return {
          x: x,
          y: y,
          radius: radius
        };
      }
    });

  const redZoneCoords = information
    .filter(({ gameState }) => {
      if (gameState) {
        if (gameState.redZonePosition.x === 0) {
          return false;
        } else return true;
      } else return false;
    })
    .map(item => {
      const { redZoneRadius: rzr } = item.gameState;
      const { x: rzx, y: rzy } = item.gameState.redZonePosition;

      if (scale) {
        return {
          x: rzx / scale,
          y: rzy / scale,
          radius: rzr / scale
        };
      } else {
        return {
          x: rzx,
          y: rzy,
          radius: rzr
        };
      }
    });

  const blackZoneCoords = information
    .filter(({ gameState }) => {
      if (gameState) {
        if (gameState.blackZoneRadius === 0) {
          return false;
        } else return true;
      } else return false;
    })
    .map(item => {
      const { blackZoneRadius: bzr } = item.gameState;
      const { x: bzx, y: bzy } = item.gameState.blackZonePosition;

      if (scale) {
        return {
          x: bzx / scale,
          y: bzy / scale,
          radius: bzr / scale
        };
      } else {
        return {
          x: bzx,
          y: bzy,
          radius: bzr
        };
      }
    });

  return {
    playerCoords: coordinates,
    safetyZoneCoords: uniqBy(safetyZoneCoords, 'x'),
    redZoneCoords: uniqBy(redZoneCoords, 'x'),
    blackZoneCoords: uniqBy(blackZoneCoords, 'x')
  };
};

module.exports = {
  getTelemetryData
};
