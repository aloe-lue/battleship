const GetShipPlaces = ({ gameboard }) => {
  const ARRAYSHIPPLACES = gameboard.SHIPPLACES;

  const ARRAY = [];
  for (let i = 0; i < ARRAYSHIPPLACES.length; i += 1) {
    const { SHIP, COORDINATES } = ARRAYSHIPPLACES[i];

    for (let j = 0; j < COORDINATES.length; j += 1) {
      const COORDINATE = COORDINATES[j];
      ARRAY.push({ SHIP, COORDINATE });
    }
  }

  return ARRAY;
};

const RenderShips = ({ gameboard, gameboardElement }) => {
  const SHIPSPLACES = GetShipPlaces({ gameboard });

  SHIPSPLACES.forEach(({ COORDINATE }) => {
    const [X, Y] = COORDINATE;
    const ELEMENT = document.querySelector(
      `${gameboardElement} > div[data-pair-coordinate='[${X}, "${Y}"]']`,
    );
    ELEMENT.classList.add('ships');
  });
};

export { RenderShips, GetShipPlaces };
