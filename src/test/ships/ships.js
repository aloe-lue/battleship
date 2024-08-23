const Ships = () => {
  const ships = {
    carrier: { length: 5, hits: 0, sunk: false },
    battleship: { length: 4, hits: 0, sunk: false },
    submarine: { length: 3, hits: 0, sunk: false },
    cruise: { length: 3, hits: 0, sunk: false },
    destroyer: { length: 2, hits: 0, sunk: false },
  };

  const hit = (ship) => {
    ships[ship].hits += 1;
  };

  const isSunk = (ship) => {
    ships[ship].sunk = ships[ship].length === ships[ship].hits;
  };

  const getShipStatus = (ship) => {
    const { hits } = ships[ship];
    const { sunk } = ships[ship];

    return { hits, sunk };
  };

  return {
    ships,
    getShipStatus,
    hit,
    isSunk,
  };
};

export default Ships;
