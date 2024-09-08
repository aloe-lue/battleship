/* eslint-disable no-undef */
// test your public interface
import { computersGameboard, playersGameboard } from './player';

test('visited length should be equal to how many set unvisited has been called', () => {
  for (let i = 0; i < 50; i += 1) {
    computersGameboard.SetUnvisited();
  }

  expect(computersGameboard.VISITED.length).toEqual(50);
});

test('computers set visited should reeturn until it returns unvisited coordinate', () => {
  expect(computersGameboard.SetUnvisited()).toEqual(
    computersGameboard.COORDINATES.at(-1),
  );
});

test('should contain ship places', () => {
  expect(computersGameboard.SHIPPLACES.length).toBe(5);
  expect(playersGameboard.SHIPPLACES.length).toBe(5);
});
