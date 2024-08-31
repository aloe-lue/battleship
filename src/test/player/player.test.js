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
