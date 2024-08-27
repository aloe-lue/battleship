import Ships from '../ships/ships';

const GAMEBOARD = () => {
  const ships = Ships();

  // prefer keyword parameters
  const increaseNum = ({ coordinates, shipLength }) => {
    const shipLen = shipLength;
    const [x, y] = coordinates;
    const result = [[x, y]];

    let asciiOfX = String(x).charCodeAt(0);
    for (let i = 1; i < shipLen; i += 1) {
      result[i] = [Number(String.fromCharCode((asciiOfX += 1))), y];

      // ascii for 10 is 49 48 doesn't work on String.fromCharCodeAt(49, 48);
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

  const shipPlaces = [];

  const getShipCoordinates = ({
    pairOfCoordinates,
    ship,
    axis,
    shipPairOfCoordinates,
  }) => {
    const coordinates = pairOfCoordinates;
    const shipName = ship;
    const axe = axis;
    const shipPlace = shipPairOfCoordinates;
    const shipsLength = {
      carrier: 5,
      battleship: 4,
      cruise: 3,
      submarine: 3,
      destroyer: 2,
    };

    const shipLength = shipsLength[shipName];
    if (axe === 'v') {
      const vertical = {
        ship: shipName,
        coordinates: increaseNum({ coordinates, shipLength }),
      };
      shipPlace.push(vertical);

      return vertical;
    }

    const horizontal = {
      ship: shipName,
      coordinates: chooseLetter({ coordinates, shipLength }),
    };
    shipPlace.push(horizontal);

    return horizontal;
  };

  const missedShots = [];

  const receiveAttack = ({ coordinate, shipPairOfCoordinates, missedShot }) => {
    const [x, y] = coordinate;
    const shipCoordinates = shipPairOfCoordinates;
    let isMissed = true;
    let shipName = '';

    const coordinatesMaps = new Map();
    while (shipCoordinates.length !== 0) {
      const { ship, coordinates } = shipCoordinates.at(0);

      for (let i = 0; i < coordinates.length; i += 1) {
        const [a, b] = coordinates[i];

        coordinatesMaps.set(`${a}-${b}`, ship);
      }
      shipCoordinates.shift();
    }

    if (coordinatesMaps.has(`${x}-${y}`)) {
      isMissed = false;
      shipName = coordinatesMaps.get(`${x}-${y}`);
      ships.hit(shipName);
      return shipName;
    }

    const missed = missedShot;
    missed.push([x, y]);
    return [x, y];
  };

  return {
    ships,
    shipPlaces,
    missedShots,
    getShipCoordinates,
    receiveAttack,
  };
};

export default GAMEBOARD;
