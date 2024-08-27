const GAMEBOARD = () => {
  const increaseNum = (coordinates, shipLength) => {
    const shipLen = shipLength;
    const [x, y] = coordinates;
    const result = [[x, y]];

    if (x + shipLen > 10) {
      return null;
    }

    let asciiOfX = String(x).charCodeAt(0);
    for (let i = 1; i < shipLen; i += 1) {
      result[i] = [Number(String.fromCharCode((asciiOfX += 1))), y];
    }

    return result;
  };

  const chooseLetter = (coordinates, shipLength) => {
    const shipLen = shipLength;
    const [x, y] = coordinates;
    let result = [[x, y]];
    let asciiOfY = y.charCodeAt(0);

    for (let i = 1; i < shipLen; i += 1) {
      result[i] = [x, String.fromCharCode((asciiOfY += 1))];

      // ! I feel like there is something wrong here
      if (asciiOfY > 74 || asciiOfY > 106) {
        result = null;
        return result;
      }
    }
    return result;
  };

  const shipPlaces = [];

  const getShipCoordinates = (
    pairOfCoordinates,
    ship,
    axis,
    shipPairOfCoordinates,
  ) => {
    const coordinates = pairOfCoordinates;
    const shipName = ship;
    const axe = axis;
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
        coordinates: increaseNum(coordinates, shipLength),
      };

      shipPairOfCoordinates.push(vertical);

      return vertical;
    }
    const horizontal = {
      ship: shipName,
      coordinates: chooseLetter(coordinates, shipLength),
    };

    shipPairOfCoordinates.push(horizontal);
    return horizontal;
  };

  const handleOverlapCoordinates = () => {};

  const missedShots = [];

  const receiveAttack = (coordinate, shipPairOfCoordinates) => {
    const [x, y] = coordinate;
    const shipCoordinates = shipPairOfCoordinates;
    let isMissed = true;
    let shipName = '';

    while (shipCoordinates.length !== 0) {
      const { ship, coordinates } = shipCoordinates.at(0);

      for (let i = 0; i < coordinates.length; i += 1) {
        const [a, b] = coordinates[i];

        if (x === a && y === b) {
          isMissed = false;
          shipName = ship;
        }
      }
      shipCoordinates.shift();
    }
    return isMissed ? [x, y] : shipName;
  };

  return {
    shipPlaces,
    missedShots,
    getShipCoordinates,
    receiveAttack,
  };
};

export default GAMEBOARD;
