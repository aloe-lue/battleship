import GAMEBOARD from '../gameboard/gameboard';

const playersGameboard = GAMEBOARD();
const computersGameboard = GAMEBOARD();

const ships = [
  // had to change it like this cuz it adds lines of codes
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
    axe: element.axe,
    shipPlacement: playersGameboard.shipPlaces,
    shipsFactory: playersGameboard.ships,
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
    shipPlacement: computersGameboard.shipPlaces,
    shipsFactory: computersGameboard.ships,
  }),
);

export { playersGameboard, computersGameboard };
