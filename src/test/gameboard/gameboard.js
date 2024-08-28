import Ships from '../ships/ships';

const GAMEBOARD = () => {
  const ships = Ships();
  /**
   * using array is unstable and when top are accessible,
   * the top changes when accessing other array variables
   */
  const missedShots = new Set();
  const shipPlaces = new Map();

  // well this is tight
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
        coordinates: increaseNum({ coordinates, shipLength }),
      };
      shipPlacement.set(`${vertical.ship}`, vertical.coordinates);

      return vertical;
    }

    const horizontal = {
      ship: shipName,
      coordinates: chooseLetter({ coordinates, shipLength }),
    };
    shipPlacement.set(`${horizontal.ship}`, horizontal.coordinates);

    return horizontal;
  };

  // changes are made to ship placement i need to change this code
  // well this is tight
  const receiveAttack = ({
    coordinate,
    shipPlacement,
    missedShot,
    shipFactory,
  }) => {
    const [x, y] = coordinate;
    // changes are introduce at the top i need to change this
    const shipCoordinates = shipPlacement;

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
      // this function doesn't need isMissed = false
      const shipName = coordinatesMaps.get(`${x}-${y}`);
      shipFactory.hit(shipName);
      return shipName;
    }

    missedShot.push([x, y]);
    return [x, y];
  };

  const keepTrackMissedAttacks = () => {};
  const isShipAllSunk = () => {};

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
