import Ships from '../ships/ships';

const GAMEBOARD = () => {
  const ships = Ships();
  const shipPlaces = [];
  const missedShots = [];

  const getShipPlacesAndMissedShots = () => ({ shipPlaces, missedShots });

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
      shipPlacement.push(vertical);

      return vertical;
    }

    const horizontal = {
      ship: shipName,
      coordinates: chooseLetter({ coordinates, shipLength }),
    };
    shipPlacement.push(horizontal);

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
    const shipCoordinates = shipPlacement;
    const shipsLocationTmp = [];

    for (let i = 0; i < shipCoordinates.length; i += 1) {
      const { ship, coordinates } = shipCoordinates[i];

      for (let j = 0; j < coordinates.length; j += 1) {
        const [a, b] = coordinates[j];

        shipsLocationTmp.push({ ship, pair: [a, b] });
      }
    }

    for (let j = 0; j < shipsLocationTmp.length; j += 1) {
      const { ship, pair } = shipsLocationTmp[j];
      const [a, b] = pair;

      if (a === x && b === y) {
        shipFactory.hit(ship);
        return ship;
      }
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
    getShipPlacesAndMissedShots,
    getShipCoordinates,
    receiveAttack,
    keepTrackMissedAttacks,
    isShipAllSunk,
  };
};

export default GAMEBOARD;
