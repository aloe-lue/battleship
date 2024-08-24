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

describe('place ship to touch another ship', () => {
  test('place another carrier', () => {
    expect(
      gameboard.placeShip('carrier', [1, 'b'], 'horizontal').at(5),
    ).toEqual({
      ship: 'carrier',
      coordinates: [
        [1, 'b'],
        [1, 'c'],
        [1, 'd'],
        [1, 'e'],
        [1, 'f'],
      ],
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

  test('place another carrier on top of carrier', () => {
    expect(gameboard.placeShip('battleship', [3, 'c'], 'vertical')).toBe(
      "don't put ship on top of each other",
    );
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

  test('should record missed shot', () => {
    gameboard.receiveAttack([5, 'b']);
    expect(gameboard.missedShot.at(-1)).toEqual([5, 'b']);
  });
});

const P2Gameboard = Gameboard();
P2Gameboard.placeShip('carrier', [3, 'i'], 'vertical');
P2Gameboard.placeShip('battleship', [3, 'c'], 'vertical');
P2Gameboard.placeShip('cruise', [1, 'f'], 'vertical');
P2Gameboard.placeShip('submarine', [8, 'd'], 'horizontal');
P2Gameboard.placeShip('destroyer', [1, 'a'], 'vertical');

describe('keep track of missed attacks so they can display them properly', () => {
  test('missed attacks by player, opponent displays this missed attacks on their gameboard.', () => {
    P2Gameboard.receiveAttack([1, 'b']);
    expect(gameboard.keepTrackMissedAttack(P2Gameboard)).toEqual([[1, 'b']]);
  });

  test("missed attacks by player, shouldn't display the same last coordinate", () => {
    P2Gameboard.receiveAttack([10, 'j']);
    expect(gameboard.keepTrackMissedAttack(P2Gameboard)).toEqual([
      [1, 'b'],
      [10, 'j'],
    ]);
  });
});

const P3Gameboard = Gameboard();
P3Gameboard.placeShip('carrier', [3, 'i'], 'vertical');
P3Gameboard.placeShip('battleship', [3, 'c'], 'vertical');
P3Gameboard.placeShip('cruise', [1, 'f'], 'vertical');
P3Gameboard.placeShip('submarine', [8, 'd'], 'horizontal');
P3Gameboard.placeShip('destroyer', [1, 'a'], 'vertical');
describe('Gameboards should be able to report whether or not all of their ships have been sunk.', () => {
  test('sunk not all ships', () => {
    const cheatingCoordinate = [
      // close
      [2, 'i'],
      [4, 'i'],
      [5, 'i'],
      [6, 'i'],
      [7, 'i'],

      // sunk their battleship
      [3, 'c'],
      [4, 'c'],
      [5, 'c'],
      [6, 'c'],

      // sunk their submarine
      [8, 'd'],
      [8, 'e'],
      [8, 'f'],

      // sunk their cruise
      [1, 'f'],
      [2, 'f'],
      [3, 'f'],

      // sunk their destroyer
      [1, 'a'],
      [2, 'a'],
    ];

    cheatingCoordinate.map((element) => P3Gameboard.receiveAttack(element));

    expect(gameboard.getShipSunk(P3Gameboard)).toEqual([
      false,
      true,
      true,
      true,
      true,
    ]);
  });

  test('sunk all opponent ships', () => {
    const cheatingCoordinate = [
      // sunk their carrier
      [3, 'i'],
      [4, 'i'],
      [5, 'i'],
      [6, 'i'],
      [7, 'i'],

      // sunk their battleship
      [3, 'c'],
      [4, 'c'],
      [5, 'c'],
      [6, 'c'],

      // sunk their submarine
      [8, 'd'],
      [8, 'e'],
      [8, 'f'],

      // sunk their cruise
      [1, 'f'],
      [2, 'f'],
      [3, 'f'],

      // sunk their destroyer
      [1, 'a'],
      [2, 'a'],
    ];

    cheatingCoordinate.map((element) => P2Gameboard.receiveAttack(element));

    expect(gameboard.getShipSunk(P2Gameboard)).toEqual([
      true,
      true,
      true,
      true,
      true,
    ]);
  });
});
