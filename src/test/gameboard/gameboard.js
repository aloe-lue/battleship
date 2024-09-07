import Ships from '../ships/ships';

const HelperFunction = () => {
  const Row = ({ coordinates, shipLength }) => {
    const SHIPLEN = shipLength;
    const [x, y] = coordinates;
    const RESULT = [];
    const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // findMatch
    let matchVal = 0;
    for (let i = 0; i < NUMBERS.length; i += 1) {
      const NUMBER = NUMBERS[i];
      if (NUMBER === x) {
        matchVal = i;
        break;
      }
    }

    for (let j = 0; j < SHIPLEN; j += 1) {
      RESULT[j] = [(matchVal += 1), y];
    }

    return RESULT;
  };

  const Column = ({ coordinates, shipLength }) => {
    const SHIPLEN = shipLength;
    const [x, y] = coordinates;
    const RESULT = [[x, y]];
    let asciiOfY = y.charCodeAt(0);

    for (let i = 1; i < SHIPLEN; i += 1) {
      RESULT[i] = [x, String.fromCharCode((asciiOfY += 1))];
    }
    return RESULT;
  };

  return {
    Row,
    Column,
  };
};

const HELPERFUNCTION = HelperFunction();

const GAMEBOARD = () => {
  const SHIPS = Ships();
  const SHIPPLACES = [];
  const MISSEDSHOTS = [];

  const getShipCoordinates = ({ pairOfCoordinates, ship, axis }) => {
    const coordinates = pairOfCoordinates;
    const shipName = ship;
    const axe = axis;

    const shipLength = SHIPS.ships[shipName].length;
    if (axe === 'v') {
      return {
        ship: shipName,
        coordinates: HELPERFUNCTION.Row({ coordinates, shipLength }),
      };
    }

    return {
      ship: shipName,
      coordinates: HELPERFUNCTION.Column({ coordinates, shipLength }),
    };
  };

  const receiveAttack = ({ coordinate }) => {
    const [x, y] = coordinate;
    const shipsLocationTmp = [];

    for (let i = 0; i < SHIPPLACES.length; i += 1) {
      const { ship, coordinates } = SHIPPLACES[i];

      for (let j = 0; j < coordinates.length; j += 1) {
        const pair = coordinates[j];

        shipsLocationTmp.push({ ship, pair });
      }
    }

    for (let j = 0; j < shipsLocationTmp.length; j += 1) {
      const { ship, pair } = shipsLocationTmp[j];
      const [a, b] = pair;

      if (a === x && b === y) {
        SHIPS.hit(ship);
        SHIPS.isSunk(ship);
        return ship;
      }
    }

    MISSEDSHOTS.push([x, y]);
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
    SHIPS,
    SHIPPLACES,
    MISSEDSHOTS,
    getShipCoordinates,
    receiveAttack,
    keepTrackMissedAttacks,
    isShipAllSunk,
  };
};

export default GAMEBOARD;
