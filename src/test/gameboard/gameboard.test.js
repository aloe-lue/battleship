import Gameboard from './gameboard';

const gameboard = Gameboard();

/* eslint-disable no-undef */
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

const SHIPPLACEMENT = ships.map((element) =>
  gameboard.getShipCoordinates({
    pairOfCoordinates: element.coordinates,
    ship: element.ship,
    axis: element.axe,
  }),
);

SHIPPLACEMENT.forEach((ship) => {
  gameboard.SHIPPLACES.push(ship);
});

test('place destroyer 9f 10f', () => {
  expect(gameboard.SHIPPLACES.at(-1).coordinates).toEqual([
    [9, 'f'],
    [10, 'f'],
  ]);
});

test('place ships at specific coordinates', () => {
  expect(gameboard.SHIPPLACES[1].coordinates).toEqual([
    [4, 'b'],
    [4, 'c'],
    [4, 'd'],
    [4, 'e'],
  ]);
});

test(`receiveAttack receives a pair of coordinates,
  determines whether or not it hit a ship, 
  if so sends the 'hit' function to the correct ship`, () => {
  expect(
    gameboard.receiveAttack({
      coordinate: [4, 'b'],
    }),
  ).toBe('battleship');

  expect(gameboard.SHIPS.getShipStatus('battleship').hits).toBe(1);
  expect(
    gameboard.receiveAttack({
      coordinate: [3, 'b'],
    }),
  ).toEqual([3, 'b']);

  expect(gameboard.MISSEDSHOTS).toEqual([[3, 'b']]);
});

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

const enemyGameboard = Gameboard();

const enemyShipsMap = enemyShips.map((element) =>
  enemyGameboard.getShipCoordinates({
    pairOfCoordinates: element.coordinates,
    ship: element.ship,
    axis: element.axe,
  }),
);

enemyShipsMap.forEach((enemyShip) => {
  enemyGameboard.SHIPPLACES.push(enemyShip);
});

test('place ships at specific coordinates', () => {
  expect(enemyGameboard.SHIPPLACES[1].coordinates).toEqual([
    [3, 'c'],
    [4, 'c'],
    [5, 'c'],
    [6, 'c'],
  ]);
});

test(`receiveAttack receives a pair of coordinates,
  determines whether or not it hit a ship, 
  if so sends the 'hit' function to the correct ship`, () => {
  expect(
    enemyGameboard.receiveAttack({
      coordinate: [3, 'h'],
    }),
  ).toEqual([3, 'h']);

  expect(enemyGameboard.SHIPS.getShipStatus('battleship').hits).toBe(0);

  expect(
    enemyGameboard.receiveAttack({
      coordinate: [3, 'b'],
    }),
  ).toEqual([3, 'b']);

  expect(enemyGameboard.MISSEDSHOTS).toEqual([
    [3, 'h'],

    [3, 'b'],
  ]);
});

test('report that their ships have been sunked', () => {
  // finds all the ships
  const shipsCoordinates = enemyGameboard.SHIPPLACES;
  const individualCoordinates = [];

  for (let i = 0; i < shipsCoordinates.length; i += 1) {
    const { coordinates } = shipsCoordinates[i];

    for (let j = 0; j < coordinates.length; j += 1) {
      const pair = coordinates[j];
      individualCoordinates.push(pair);
    }
  }

  // hit all ships
  for (let i = 0; i < individualCoordinates.length; i += 1) {
    const pair = individualCoordinates[i];

    enemyGameboard.receiveAttack({
      coordinate: pair,
    });
  }

  expect(enemyGameboard.SHIPS.getShipStatus('carrier').sunk).toBeTruthy();
  expect(
    gameboard.isShipAllSunk({ enemyGameboard: enemyGameboard.SHIPS }),
  ).toBeTruthy();
});

test('gameboard should keep track of the missed attacks', () => {
  expect(
    enemyGameboard.keepTrackMissedAttacks({
      enemygameboard: gameboard.MISSEDSHOTS,
    }),
  ).toEqual([3, 'b']);
});
