/* eslint-disable no-undef */
// test your public interface
import { playersGameboard, computersGameboard } from './player';

describe('checks for predertermined coordinates ships placement', () => {
  test('should contain ships coordinates', () => {
    expect(playersGameboard.shipPlaces.at(4).ship).toEqual('destroyer');
  });

  test('should contain enemy ships coordinates', () => {
    expect(computersGameboard.shipPlaces.at(4).ship).toEqual('destroyer');
  });
});

test('visited length should be equal to how many set unvisited has been called', () => {
  for (let i = 0; i < 50; i += 1) {
    computersGameboard.setUnvisited();
  }

  expect(computersGameboard.visited.length).toEqual(50);
});

test('computers set visited should reeturn until it returns unvisited coordinate', () => {
  expect(computersGameboard.setUnvisited()).toEqual(
    computersGameboard.coordinates.at(-1),
  );
});
