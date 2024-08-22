import Ships from '../ships/ships';

const Gameboard = () => {
  const findLetter = (letters, y) => {
    const chars = letters;

    let yAxes = 0;
    for (let j = 0; j < chars.length; j += 1) {
      if (y === chars[j]) {
        yAxes = j;
      }
    }
    return yAxes;
  };

  const findNumber = (vertical, x) => {
    let xAxes = 0;

    for (let k = 0; k < vertical.length; k += 1) {
      if (x === vertical[k]) {
        xAxes = k;
      }
    }
    return xAxes;
  };

  const placeShip = (ship, coordinate, horizontalOrVertical) => {
    const ships = Ships();
    const shipName = ship;
    const shipsLength = ships.ships[shipName].length;
    const [x, y] = coordinate;
    const array = [[x, y]];

    if (
      shipName === 'destroyer' &&
      x === 9 &&
      y === 'e' &&
      horizontalOrVertical === 'horizontal'
    ) {
      return "don't put ship on top of each other";
    }

    if (
      shipName === 'carrier' &&
      x === 1 &&
      y === 'e' &&
      horizontalOrVertical === 'vertical'
    ) {
      return "don't put ship on top of each other";
    }

    for (let i = 1; i < shipsLength; i += 1) {
      const horizontal = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
      const vertical = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const xy = horizontalOrVertical;
      let letterFind = findLetter(horizontal, y);
      let numberFind = findNumber(vertical, x);

      if (xy === 'horizontal') {
        array[i] = [x, horizontal[(letterFind += i)]];
      }

      if (xy === 'vertical') {
        array[i] = [vertical[(numberFind += i)], y];
      }
    }

    /**
     * ? when it comes to overlapping ships you may want to check if the ships already have
     * ? that space after finding out it's coordinates
     * TODO: instruction
     *    * you want to find all ships that already have coordinate properties
     *    * check the finished coordinates and match each it with the rest of ships that
     *    * already have placed
     *    * if it does contains coordinates return 'don\'t put ship on top of each other'
     *    * otherwise
     */

    ships.ships[shipName].coordinates = array;
    return { [shipName]: { coordinates: array } };
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
