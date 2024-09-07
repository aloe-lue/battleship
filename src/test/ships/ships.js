const Ships = () => {
  const SHIPS = {
    CARRIER: { LENGTH: 5, hits: 0, sunk: false },
    BATTLESHIP: { LENGTH: 4, hits: 0, sunk: false },
    SUBMARINE: { LENGTH: 3, hits: 0, sunk: false },
    CRUISE: { LENGTH: 3, hits: 0, sunk: false },
    DESTROYER: { LENGTH: 2, hits: 0, sunk: false },
  };

  const Hit = ({ ship }) => {
    SHIPS[ship].hits += 1;
  };

  const IsSunk = ({ ship }) => {
    SHIPS[ship].sunk = SHIPS[ship].LENGTH === SHIPS[ship].hits;
  };

  const GetShipStatus = ({ ship }) => {
    const { hits } = SHIPS[ship];
    const { sunk } = SHIPS[ship];

    return { hits, sunk };
  };

  return {
    SHIPS,
    GetShipStatus,
    Hit,
    IsSunk,
  };
};

export default Ships;
