import Ships from '../ships/ships';

const HELPERFUNCTION = () => {
  const increaseNum = ({ coordinates, shipLength }) => {
    const shipLen = shipLength;
    const [x, y] = coordinates;
    const result = [[x, y]];

    let asciiOfX = String(x).charCodeAt(0);
    for (let i = 1; i < shipLen; i += 1) {
      result[i] = [Number(String.fromCharCode((asciiOfX += 1))), y];

      if (asciiOfX > 57) {
        result[i] = [10, y];
      }
    }

    return result;
  };

  const chooseLetter = ({ coordinates, shipLength }) => {
    const shipLen = shipLength;
    const [x, y] = coordinates;
    const result = [[x, y]];
    let asciiOfY = y.charCodeAt(0);

    for (let i = 1; i < shipLen; i += 1) {
      result[i] = [x, String.fromCharCode((asciiOfY += 1))];
    }
    return result;
  };
  return {
    increaseNum,
    chooseLetter,
  };
};

const helperFunc = HELPERFUNCTION();

const GAMEBOARD = () => {
  const ships = Ships();
  const shipPlaces = [];
  const missedShots = [];

  const getShipCoordinates = ({
    pairOfCoordinates,
    ship,
    axis,
    shipPlacement,
    shipsFactory,
  }) => {
    const coordinates = pairOfCoordinates;
    const shipName = ship;
    const axe = axis;
    const shipF = shipsFactory;

    const shipLength = shipF.ships[shipName].length;
    if (axe === 'v') {
      const vertical = {
        ship: shipName,
        coordinates: helperFunc.increaseNum({ coordinates, shipLength }),
      };
      shipPlacement.push(vertical);

      return vertical;
    }

    const horizontal = {
      ship: shipName,
      coordinates: helperFunc.chooseLetter({ coordinates, shipLength }),
    };
    shipPlacement.push(horizontal);

    return horizontal;
  };

  const receiveAttack = ({
    coordinate,
    shipPlacement,
    missedShot,
    shipFactory,
  }) => {
    const [x, y] = coordinate;
    const shipCoordinates = shipPlacement;
    const shipsLocationTmp = [];

    for (let i = 0; i < shipCoordinates.length; i += 1) {
      const { ship, coordinates } = shipCoordinates[i];

      for (let j = 0; j < coordinates.length; j += 1) {
        const pair = coordinates[j];

        shipsLocationTmp.push({ ship, pair });
      }
    }

    for (let j = 0; j < shipsLocationTmp.length; j += 1) {
      const { ship, pair } = shipsLocationTmp[j];
      const [a, b] = pair;

      if (a === x && b === y) {
        shipFactory.hit(ship);
        shipFactory.isSunk(ship);
        return ship;
      }
    }

    missedShot.push([x, y]);
    return [x, y];
  };

  const keepTrackMissedAttacks = ({ enemygameboard }) => {
    // keep track means the get the last value that the user has already clicked
    const missedShot = enemygameboard.missedShots;
    return missedShot;
  };

  const isShipAllSunk = ({ enemyGameboard }) => {
    const entry = Object.entries(enemyGameboard.ships);
    const shipsBool = [];

    for (let i = 0; i < entry.length; i += 1) {
      const element = entry[i];

      for (let j = 0; j < element.length; j += 1) {
        const { sunk } = element[j];
        shipsBool[i] = sunk;
      }
    }

    return !shipsBool.includes(false);
  };

  return {
    ships,
    shipPlaces,
    missedShots,
    getShipCoordinates,
    receiveAttack,
    keepTrackMissedAttacks,

    isShipAllSunk,
  };
};

export default GAMEBOARD;
