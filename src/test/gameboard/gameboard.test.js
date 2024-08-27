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
