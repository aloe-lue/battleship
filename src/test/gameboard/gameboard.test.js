import Gameboard from './gameboard';

const gameboard = Gameboard();

/* eslint-disable no-undef */
describe('place the ships at the specific coordinates', () => {
  test('place carrier', () => {
    expect(gameboard.placeShip('carrier', [2, 'b'], 'horizontal')).toEqual({
      carrier: {
        coordinates: [
          [2, 'b'],
          [2, 'c'],
          [2, 'd'],
          [2, 'e'],
          [2, 'f'],
        ],
      },
    });
  });

  test('place battleship', () => {
    expect(gameboard.placeShip('battleship', [4, 'b'], 'horizontal')).toEqual({
      battleship: {
        coordinates: [
          [4, 'b'],
          [4, 'c'],
          [4, 'd'],
          [4, 'e'],
        ],
      },
    });
  });

  test('place submarine', () => {
    expect(gameboard.placeShip('submarine', [3, 'h'], 'horizontal')).toEqual({
      submarine: {
        coordinates: [
          [3, 'h'],
          [3, 'i'],
          [3, 'j'],
        ],
      },
    });
  });

  test('place cruise', () => {
    expect(gameboard.placeShip('cruise', [7, 'a'], 'horizontal')).toEqual({
      cruise: {
        coordinates: [
          [7, 'a'],
          [7, 'b'],
          [7, 'c'],
        ],
      },
    });
  });

  test('place destroyer vertically', () => {
    expect(gameboard.placeShip('destroyer', [9, 'f'], 'vertical')).toEqual({
      destroyer: {
        coordinates: [
          [9, 'f'],
          [10, 'f'],
        ],
      },
    });
  });
});

describe('placing ship on top of another ship is not allowed', () => {
  test('place another destroyer on top of destroyer', () => {
    expect(gameboard.placeShip('destroyer', [9, 'e'], 'horizontal')).toBe(
      "don't put ship on top of each other",
    );
  });

  test('place another carrier on top of carrier', () => {
    expect(gameboard.placeShip('carrier', [1, 'e'], 'vertical')).toBe(
      "don't put ship on top of each other",
    );
  });
});
