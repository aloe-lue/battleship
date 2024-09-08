import Ships from '../ships/ships';

const HelperFunction = () => {
  const Row = ({ coordinates, shipLength }) => {
    const SHIPLEN = shipLength;
    const [x, y] = coordinates;
    const RESULT = [];
    const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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

const Gameboard = () => {
  const SHIPS = Ships();
  const SHIPPLACES = [];
  const MISSEDSHOTS = [];

  const GetShipCoordinates = ({ pairOfCoordinates, ship, axis }) => {
    const COORDINATE = pairOfCoordinates;
    const SHIP = ship;
    const AXE = axis;

    const { LENGTH } = SHIPS.SHIPS[SHIP];
    const { Row, Column } = HelperFunction();
    if (AXE === 'vertical') {
      return {
        SHIP,
        COORDINATES: Row({ coordinates: COORDINATE, shipLength: LENGTH }),
      };
    }

    return {
      SHIP,
      COORDINATES: Column({ coordinates: COORDINATE, shipLength: LENGTH }),
    };
  };

  const ReceiveAttack = ({ coordinate }) => {
    const [X, Y] = coordinate;
    const SHIPLOCATION = [];

    for (let i = 0; i < SHIPPLACES.length; i += 1) {
      const { SHIP, COORDINATES } = SHIPPLACES[i];

      for (let j = 0; j < COORDINATES.length; j += 1) {
        const PAIR = COORDINATES[j];

        SHIPLOCATION.push({ SHIP, PAIR });
      }
    }

    for (let j = 0; j < SHIPLOCATION.length; j += 1) {
      const { SHIP, PAIR } = SHIPLOCATION[j];
      const [A, B] = PAIR;

      if (A === X && B === Y) {
        SHIPS.Hit({ ship: SHIP });
        SHIPS.IsSunk({ ship: SHIP });
        return SHIP;
      }
    }

    MISSEDSHOTS.push([X, Y]);
    return [X, Y];
  };

  const IsShipAllSunk = ({ enemyGameboard }) => {
    const ENTRY = Object.entries(enemyGameboard.SHIPS);
    const SHIPSBOOL = [];

    for (let i = 0; i < ENTRY.length; i += 1) {
      const ELEMENT = ENTRY[i];

      for (let j = 0; j < ELEMENT.length; j += 1) {
        // sunk can change that's why it's small letter
        const { sunk } = ELEMENT[j];
        SHIPSBOOL[i] = sunk;
      }
    }

    return !SHIPSBOOL.includes(false);
  };

  return {
    SHIPS,
    SHIPPLACES,
    MISSEDSHOTS,
    GetShipCoordinates,
    ReceiveAttack,
    IsShipAllSunk,
  };
};

export default Gameboard;
