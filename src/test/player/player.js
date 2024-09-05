import GAMEBOARD from '../gameboard/gameboard';

// use the return value for adding a classList for an element
const helperFunction = () => {
  const isHit = ({ info }) => {
    const infos = info;
    return typeof infos === 'object';
  };

  const disableClick = ({ condition }) => {
    if (condition) {
      return 'disable-pointer';
    }

    return 'enable-pointer';
  };

  return { isHit, disableClick };
};

const BasicBattleshipCPU = () => {
  const visited = [];
  const coordinates = [];

  const getRandomNumber = ({ min, max }) =>
    Math.floor(Math.random() * (max + 1 - min) + min);

  const createGrid = () => {
    const array = [];
    let asciiOfA = 97; // -> 106 ---> a b c d e f g h i j;
    let num = 1; // -> 10 ---> 1 2 3 4 5 6 7 8 9 10;

    for (let i = 0; i < 100; i += 1) {
      if (asciiOfA > 106) {
        asciiOfA = 97;
        num += 1;
      }
      array[i] = [num, String.fromCharCode(asciiOfA)];
      asciiOfA += 1;
    }

    return array;
  };

  // coordinate randomizer
  const setUnvisited = () => {
    const randomNumber = getRandomNumber({ min: 0, max: 99 });
    const [x, y] = createGrid()[randomNumber];

    if (!visited.includes(`${x}-${y}`)) {
      visited.push(`${x}-${y}`);
      coordinates.push([x, y]);
      return [x, y];
    }

    if (visited.length === 100) {
      return [x, y];
    }

    return setUnvisited();
  };

  const attackPlayerSquare = ({ hitInfo, status, gameboard, array = [] }) => {
    const isMissed = hitInfo;
    const stat = status;

    if (isMissed === false) {
      return array;
    }
    if (stat === true) {
      return array;
    }

    const coordinate = setUnvisited();
    const attackInfo = gameboard.receiveAttack({
      coordinate,
    });
    const { isHit } = helperFunction();
    const isShipMissed = isHit({ info: attackInfo });

    return array.concat(
      { coordinate, isShipMissed },
      attackPlayerSquare({ hitInfo, gameboard, status: isShipMissed, array }),
    );
  };

  return {
    visited,
    coordinates,
    getRandomNumber,
    setUnvisited,
    attackPlayerSquare,
  };
};

const computersGameboard = Object.assign(GAMEBOARD(), BasicBattleshipCPU());

const playersGameboard = GAMEBOARD();

const ships = [
  {
    ship: 'carrier',
    coordinates: [2, 'b'],
    axe: 'h',
  },
  {
    ship: 'battleship',
    coordinates: [4, 'b'],
    axe: 'h',
  },
  {
    ship: 'submarine',
    coordinates: [3, 'h'],
    axe: 'h',
  },
  {
    ship: 'cruise',
    coordinates: [7, 'a'],
    axe: 'h',
  },
  {
    ship: 'destroyer',
    coordinates: [9, 'f'],
    axe: 'v',
  },
];

ships.map((element) =>
  playersGameboard.getShipCoordinates({
    pairOfCoordinates: element.coordinates,
    ship: element.ship,
    axis: element.axe,
  }),
);

const enemyShips = [
  // had to change it like this cuz it adds lines of codes
  {
    ship: 'carrier',
    coordinates: [3, 'i'],
    axe: 'v',
  },
  {
    ship: 'battleship',
    coordinates: [3, 'c'],
    axe: 'v',
  },
  {
    ship: 'submarine',
    coordinates: [1, 'f'],
    axe: 'v',
  },
  {
    ship: 'cruise',
    coordinates: [8, 'd'],
    axe: 'h',
  },
  {
    ship: 'destroyer',
    coordinates: [1, 'a'],
    axe: 'v',
  },
];

enemyShips.map((element) =>
  computersGameboard.getShipCoordinates({
    pairOfCoordinates: element.coordinates,
    ship: element.ship,
    axis: element.axe,
  }),
);

export { playersGameboard, computersGameboard, helperFunction };
