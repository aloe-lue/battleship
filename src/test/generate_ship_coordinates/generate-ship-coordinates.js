import Gameboard from '../gameboard/gameboard';

const RandomShipsPlacement = () => {
  // same ship handler
  const IsTheSameShip = ({ places, ship }) => {
    const PLACES = places;
    const SHIP = ship;

    let currShip = false;
    for (let i = 0; i < PLACES.length; i += 1) {
      const ELEMENT = PLACES[i];
      if (SHIP === ELEMENT.SHIP) {
        currShip = true;
        break;
      }
    }

    return currShip;
  };

  // over the board handler
  const IsOverTheBoard = ({ coordinates }) => {
    const COORDINATES = coordinates;
    let overTheBoard = false;

    for (let i = 0; i < COORDINATES.length; i += 1) {
      const [X, Y] = COORDINATES[i];

      // previous doesn't allow 10 but now it allows until 10
      if (X > 10) {
        overTheBoard = true;
        break;
      }
      const ASCIIOFY = Y.charCodeAt(0);
      // previous doesn't allow 106 but now it allows until 106
      if (ASCIIOFY > 106) {
        overTheBoard = true;
        break;
      }
    }
    return overTheBoard;
  };

  // overlap ship handler
  const IsOverlap = ({ coordinates, placed }) => {
    const COORDINATES = coordinates;

    let overlap = false;
    for (let i = 0; i < COORDINATES.length; i += 1) {
      const [x, y] = COORDINATES[i];

      if (placed.has(`${x}-${y}`)) {
        overlap = true;
        break;
      }

      if (!placed.has(`${x}-${y}`)) {
        placed.add(`${x}-${y}`);
      }
    }
    return overlap;
  };

  const SetShipsPlaces = ({
    places = [],
    placed = new Set(),
    helperFunction,
  }) => {
    if (places.length === 5) {
      return places;
    }
    const { GetRandomShipPlacement } = helperFunction();
    const { COORDINATE, AXIS, SHIP } = GetRandomShipPlacement();

    if (IsTheSameShip({ places, ship: SHIP })) {
      return SetShipsPlaces({ places, placed, helperFunction });
    }

    const { GetShipCoordinates } = Gameboard();
    const SHIPCOORDINATES = GetShipCoordinates({
      pairOfCoordinates: COORDINATE,
      axis: AXIS,
      ship: SHIP,
    });

    const { COORDINATES } = SHIPCOORDINATES;
    if (IsOverTheBoard({ coordinates: COORDINATES })) {
      return SetShipsPlaces({ places, placed, helperFunction });
    }

    if (IsOverlap({ coordinates: COORDINATES, placed })) {
      return SetShipsPlaces({ places, placed, helperFunction });
    }

    return SetShipsPlaces({
      places: places.concat(SHIPCOORDINATES),
      placed,
      helperFunction,
    });
  };

  return { SetShipsPlaces };
};

export default RandomShipsPlacement;
