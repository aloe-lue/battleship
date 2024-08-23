import Ships from '../ships/ships';

const Gameboard = () => {
  const shipPlace = [];

  const findLetter = (letters, y) => {
    const chars = letters;
    const vert = y;

    let yAxes = 0;
    for (let j = 0; j < chars.length; j += 1) {
      if (vert === chars[j]) {
        yAxes = j;
      }
    }
    return yAxes;
  };

  const findNumber = (numbers, x) => {
    const num = numbers;
    const hort = x;

    let xAxes = 0;
    for (let k = 0; k < num.length; k += 1) {
      if (hort === num[k]) {
        xAxes = k;
      }
    }
    return xAxes;
  };

  const shipPlacement = (ship, coordinate, axis) => {
    const fleet = Ships();
    const [x, y] = coordinate;
    const shipName = ship;
    const shipLength = fleet.ships[shipName].length;

    const coordinates = [[x, y]];
    for (let i = 1; i < shipLength; i += 1) {
      const xy = axis;
      const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      const vertical = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let letterFind = findLetter(horizontal, y);
      let numberFind = findNumber(vertical, x);

      if (xy === 'horizontal') {
        coordinates[i] = [x, horizontal[(letterFind += i)]];
      }

      if (xy === 'vertical') {
        coordinates[i] = [vertical[(numberFind += i)], y];
      }
    }

    return coordinates;
  };

  const allowShipPlacement = (coordinate, placedShip) => {
    const coor = coordinate;
    const shipLocation = placedShip;
    let allow = true;

    for (let i = 0; i < coor.length; i += 1) {
      const [x, y] = coor[i];

      for (let j = 0; j < shipLocation.length; j += 1) {
        const element = shipLocation[j].coordinates;

        for (let k = 0; k < element.length; k += 1) {
          const [a, b] = element[k];

          if (x === a && y === b) {
            allow = false;
          }
        }
      }
    }

    return allow;
  };

  const placeShip = (ship, coordinate, axis) => {
    const shipName = ship;
    const [x, y] = coordinate;

    const coordinates = shipPlacement(shipName, [x, y], axis);
    const placeIt = allowShipPlacement(coordinates, shipPlace);

    if (placeIt === true) {
      shipPlace.push({ ship, coordinates });
      return shipPlace;
    }

    return "don't put ship on top of each other";
  };

  const receiveAttack = () => {
    /**
     * todo: instruction down
     * Gameboards should have a receiveAttack function that takes a pair of coordinates,
     * determines whether or not the attack hit a ship and then sends the ‘hit’ function
     * to the correct ship, or records the coordinates of the missed shot.
     */
  };

  const missedAttacks = () => {
    /**
     *  Gameboards should keep track of missed attacks so they can display them properly.
     */
  };

  const reportShipSunk = () => {
    /**
     * Gameboards should be able to report whether or not all of their ships have been sunk.
     */
  };

  return {
    placeShip,
    receiveAttack,
    missedAttacks,
    reportShipSunk,
  };
};

export default Gameboard;
