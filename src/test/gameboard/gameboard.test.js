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

ships.map((element) =>
  gameboard.getShipCoordinates({
    pairOfCoordinates: element.coordinates,
    ship: element.ship,
    axe: element.axe,
    shipPlacement: gameboard.shipPlaces,
    shipsFactory: gameboard.ships,
  }),
);

test('place ships at specific coordinates', () => {
  expect(gameboard.shipPlaces.get('battleship')).toEqual([
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
      shipPairOfCoordinates: gameboard.shipPlaces,
      missedShot: gameboard.missedShots,
      shipFactory: gameboard.ships,
    }),
  ).toBe('battleship');

  expect(gameboard.ships.getShipStatus('battleship').hits).toBe(1);

  expect(
    gameboard.receiveAttack({
      coordinate: [3, 'b'],
      shipPairOfCoordinates: gameboard.shipPlaces,
      missedShot: gameboard.missedShots,
      shipFactory: gameboard.ships,
    }),
  ).toEqual([3, 'b']);

  expect(gameboard.missedShots).toEqual([[3, 'b']]);
});
