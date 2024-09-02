import Ships from '../ships/ships';

const HELPERFUNCTION = () => {
  const row = ({ coordinates, shipLength }) => {
    const shipLen = shipLength;
    const [x, y] = coordinates;
    const result = [];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // findMatch
    let matchVal = 0;
    for (let i = 0; i < numbers.length; i += 1) {
      const number = numbers[i];
      if (number === x) {
        matchVal = i;
        break;
      }
    }

    for (let j = 0; j < shipLen; j += 1) {
      result[j] = [(matchVal += 1), y];
    }

    return result;
  };

  const column = ({ coordinates, shipLength }) => {
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
    row,
    column,
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
        coordinates: helperFunc.row({ coordinates, shipLength }),
      };
      shipPlacement.push(vertical);

      return vertical;
    }

    const horizontal = {
      ship: shipName,
      coordinates: helperFunc.column({ coordinates, shipLength }),
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
    // this points to the latest attack commited
    const missedShot = enemygameboard;
    return missedShot.at(-1);
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
