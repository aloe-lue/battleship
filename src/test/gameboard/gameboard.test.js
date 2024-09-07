import Gameboard from './gameboard';

const gameboard = Gameboard();

/* eslint-disable no-undef */
const ships = [
  // had to change it like this cuz it adds lines of codes
  {
    ship: 'CARRIER',
    coordinates: [2, 'b'],
    axe: 'horizontal',
  },
  {
    ship: 'BATTLESHIP',
    coordinates: [4, 'b'],
    axe: 'horizontal',
  },
  {
    ship: 'SUBMARINE',
    coordinates: [3, 'h'],
    axe: 'horizontal',
  },
  {
    ship: 'CRUISE',
    coordinates: [7, 'a'],
    axe: 'horizontal',
  },
  {
    ship: 'DESTROYER',
    coordinates: [9, 'f'],
    axe: 'vertical',
  },
];

const SHIPPLACEMENT = ships.map((element) =>
  gameboard.GetShipCoordinates({
    pairOfCoordinates: element.coordinates,
    ship: element.ship,
    axis: element.axe,
  }),
);

SHIPPLACEMENT.forEach((ship) => {
  gameboard.SHIPPLACES.push(ship);
});

test('place destroyer 9f 10f', () => {
  expect(gameboard.SHIPPLACES.at(-1).COORDINATES).toEqual([
    [9, 'f'],
    [10, 'f'],
  ]);
});

test('place ships at specific coordinates', () => {
  expect(gameboard.SHIPPLACES[1].COORDINATES).toEqual([
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
    gameboard.ReceiveAttack({
      coordinate: [4, 'b'],
    }),
  ).toBe('BATTLESHIP');

  expect(gameboard.SHIPS.GetShipStatus({ ship: 'BATTLESHIP' }).hits).toBe(1);
  expect(
    gameboard.ReceiveAttack({
      coordinate: [3, 'b'],
    }),
  ).toEqual([3, 'b']);

  expect(gameboard.MISSEDSHOTS).toEqual([[3, 'b']]);
});

const enemyShips = [
  // had to change it like this cuz it adds lines of codes
  {
    ship: 'CARRIER',
    coordinates: [3, 'i'],
    axe: 'vertical',
  },
  {
    ship: 'BATTLESHIP',
    coordinates: [3, 'c'],
    axe: 'vertical',
  },
  {
    ship: 'SUBMARINE',
    coordinates: [1, 'f'],
    axe: 'vertical',
  },
  {
    ship: 'CRUISE',
    coordinates: [8, 'd'],
    axe: 'horizontal',
  },
  {
    ship: 'DESTROYER',
    coordinates: [1, 'a'],
    axe: 'vertical',
  },
];

const enemyGameboard = Gameboard();

const enemyShipsMap = enemyShips.map((element) =>
  enemyGameboard.GetShipCoordinates({
    pairOfCoordinates: element.coordinates,
    ship: element.ship,
    axis: element.axe,
  }),
);

enemyShipsMap.forEach((enemyShip) => {
  enemyGameboard.SHIPPLACES.push(enemyShip);
});

test('place ships at specific coordinates', () => {
  expect(enemyGameboard.SHIPPLACES[1].COORDINATES).toEqual([
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
    enemyGameboard.ReceiveAttack({
      coordinate: [3, 'h'],
    }),
  ).toEqual([3, 'h']);

  expect(enemyGameboard.SHIPS.GetShipStatus({ ship: 'BATTLESHIP' }).hits).toBe(
    0,
  );

  expect(
    enemyGameboard.ReceiveAttack({
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
    const { COORDINATES } = shipsCoordinates[i];

    for (let j = 0; j < COORDINATES.length; j += 1) {
      const pair = COORDINATES[j];
      individualCoordinates.push(pair);
    }
  }

  // hit all ships
  for (let i = 0; i < individualCoordinates.length; i += 1) {
    const pair = individualCoordinates[i];

    enemyGameboard.ReceiveAttack({
      coordinate: pair,
    });
  }

  expect(
    enemyGameboard.SHIPS.GetShipStatus({ ship: 'CARRIER' }).sunk,
  ).toBeTruthy();
  expect(
    gameboard.IsShipAllSunk({ enemyGameboard: enemyGameboard.SHIPS }),
  ).toBeTruthy();
});
