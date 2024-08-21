import Ships from './ships';

const ship = Ships();

/* eslint-disable no-undef */
describe('hit function should increase the ship hits', () => {
  test('hit() should increases the ship hits', () => {
    ship.hit('carrier');

    expect(ship.getShipStatus('carrier').hits).toEqual(1);
  });

  test('hitting battleship twice should increase the ship hits to 2', () => {
    ship.hit('battleship');
    ship.hit('battleship');

    expect(ship.getShipStatus('battleship').hits).toEqual(2);
  });

  test('sunk a ship', () => {
    ship.hit('destroyer');
    ship.hit('destroyer');

    expect(ship.getShipStatus('destroyer').hits).toEqual(2);
  });
});

describe('test whether or not ship has been sunk', () => {
  test('destroyer is sunk', () => {
    ship.isSunk('destroyer');
    expect(ship.getShipStatus('destroyer').sunk).toBeTruthy();
  });

  test('battleship is not sunk yet', () => {
    ship.isSunk('battleship');
    expect(ship.getShipStatus('battleship').sunk).toBeFalsy();
  });
});

describe('test if you get back the values', () => {
  test('get destroyer status', () => {
    expect(ship.getShipStatus('destroyer')).toEqual({ hits: 2, sunk: true });
  });
});
