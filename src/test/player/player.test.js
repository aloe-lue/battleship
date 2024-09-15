/* eslint-disable no-undef */
// test your public interface
import { ComputerGameboard } from './player';

const { computersGameboard } = ComputerGameboard();

test('visited length should be equal to how many set unvisited has been called', () => {
  for (let i = 0; i < 50; i += 1) {
    computersGameboard.SetUnvisited();
  }
  expect(computersGameboard.VISITED.size).toEqual(50);
});

describe('say you hit a ship you are given a chance to hit again', () => {
  test('get adjacent slot of hit coordinate, use it to guess where to hit', () => {
    expect(
      computersGameboard.HitAdjacent({ coordinate: [2, 'b'], ship: 'carrier' }),
    ).toEqual([
      [1, 'b'],
      [2, 'a'],
      [3, 'b'],
      [2, 'c'],
    ]);
  });
});
