import Gameboard from './gameboard';

const gameboard = Gameboard();

/* eslint-disable no-undef */
describe('place the ships at the specific coordinates', () => {
  const ships = [
    {
      ship: 'carrier',
      coordinates: [2, 'b'],
      axe: 'horizontal',
    },
    {
      ship: 'battleship',
      coordinates: [4, 'b'],
      axe: 'horizontal',
    },
    {
      ship: 'submarine',
      coordinates: [3, 'h'],
      axe: 'horizontal',
    },
    {
      ship: 'cruise',
      coordinates: [7, 'a'],
      axe: 'horizontal',
    },
    {
      ship: 'destroyer',
      coordinates: [9, 'f'],
      axe: 'vertical',
    },
  ];

  const shipPlacement = ships.map((element) =>
    gameboard.placeShip(element.ship, element.coordinates, element.axe),
  );

  const shipPlaces = [
    {
      ship: 'carrier',
      coordinates: [
        [2, 'b'],
        [2, 'c'],
        [2, 'd'],
        [2, 'e'],
        [2, 'f'],
      ],
    },
    {
      ship: 'battleship',
      coordinates: [
        [4, 'b'],
        [4, 'c'],
        [4, 'd'],
        [4, 'e'],
      ],
    },
    {
      ship: 'submarine',
      coordinates: [
        [3, 'h'],
        [3, 'i'],
        [3, 'j'],
      ],
    },

    {
      ship: 'cruise',
      coordinates: [
        [7, 'a'],
        [7, 'b'],
        [7, 'c'],
      ],
    },
    {
      ship: 'destroyer',
      coordinates: [
        [9, 'f'],
        [10, 'f'],
      ],
    },
  ];

  test('place all ships', () => {
    for (let i = 0; i < shipPlacement.length; i += 1) {
      expect(shipPlacement.at(0).at(i)).toEqual(shipPlaces.at(i));
    }
  });
});

describe('receive attack', () => {
  test('carrier got hit', () => {
    gameboard.receiveAttack([2, 'b']);
    expect(gameboard.ships.getShipStatus('carrier').hits).toEqual(1);
  });

  test('destroyer got hit', () => {
    gameboard.receiveAttack([9, 'f']);
    expect(gameboard.ships.getShipStatus('destroyer').hits).toEqual(1);
  });
});

/**
 * @feat
 * create a test for missed missedAttacks
 * create a test for when the oponent's ships are all sunk
 * */
const P2Gameboard = Gameboard();
P2Gameboard.placeShip('carrier', [3, 'i'], 'vertical');
P2Gameboard.placeShip('battleship', [3, 'c'], 'vertical');
P2Gameboard.placeShip('cruise', [1, 'f'], 'vertical');
P2Gameboard.placeShip('submarine', [8, 'd'], 'horizontal');
P2Gameboard.placeShip('destroyer', [1, 'a'], 'vertical');

describe('keep track of missed attacks so they can display them properly', () => {
  test('missed attacks by player, opponent displays this missed attacks on their gameboard.', () => {
    P2Gameboard.receiveAttack([1, 'b']);
    expect(gameboard.getMissedAttack(P2Gameboard)).toEqual([1, 'b']);
  });

  test('missed attacks by player, opponent displays many', () => {
    P2Gameboard.receiveAttack([1, 'b']);
  });
});
