import Ships from './ships';

const ship = Ships();

/* eslint-disable no-undef */
describe('hit function should increase the ship hits', () => {
  test('hit() should increases the ship hits', () => {
    ship.Hit({ ship: 'CARRIER' });

    expect(ship.GetShipStatus({ ship: 'CARRIER' }).hits).toEqual(1);
  });

  test('hitting battleship twice should increase the ship hits to 2', () => {
    ship.Hit({ ship: 'BATTLESHIP' });
    ship.Hit({ ship: 'BATTLESHIP' });

    expect(ship.GetShipStatus({ ship: 'BATTLESHIP' }).hits).toEqual(2);
  });

  test('sunk a ship', () => {
    ship.Hit({ ship: 'DESTROYER' });
    ship.Hit({ ship: 'DESTROYER' });

    expect(ship.GetShipStatus({ ship: 'DESTROYER' }).hits).toEqual(2);
  });
});

describe('test whether or not ship has been sunk', () => {
  test('destroyer is sunk', () => {
    ship.IsSunk({ ship: 'DESTROYER' });
    expect(ship.GetShipStatus({ ship: 'DESTROYER' }).sunk).toBeTruthy();
  });

  test('battleship is not sunk yet', () => {
    ship.IsSunk({ ship: 'BATTLESHIP' });
    expect(ship.GetShipStatus({ ship: 'BATTLESHIP' }).sunk).toBeFalsy();
  });
});

describe('test if you get back the values', () => {
  test('get destroyer status', () => {
    expect(ship.GetShipStatus({ ship: 'DESTROYER' })).toEqual({
      hits: 2,
      sunk: true,
    });
  });
});
