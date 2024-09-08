/* eslint-disable no-undef */
import RandomShipsPlacement from './generate-ship-coordinates';
import { HelperFunction } from '../player/player';

const RANDOMSHIPPLACE = RandomShipsPlacement();

test('should not go over the board', () => {
  expect(
    RANDOMSHIPPLACE.SetShipsPlaces({
      places: [],
      placed: new Set(),
      helperFunction: HelperFunction,
    }).length,
  ).toEqual(5);
});
