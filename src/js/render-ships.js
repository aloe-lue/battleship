const getShipPlaces = ({ gameboard }) => {
  const arrayShipPlaces = gameboard.shipPlaces;

  const array = [];
  for (let i = 0; i < arrayShipPlaces.length; i += 1) {
    const { ship, coordinates } = arrayShipPlaces[i];

    for (let j = 0; j < coordinates.length; j += 1) {
      const coordinate = coordinates[j];
      array.push({ ship, coordinate });
    }
  }

  return array;
};

const renderShips = ({ gameboard, gameboardElement }) => {
  const shipPlaces = getShipPlaces({ gameboard });

  shipPlaces.forEach(({ coordinate }) => {
    const [x, y] = coordinate;
    const element = document.querySelector(
      `${gameboardElement} > div[data-pair-coordinate='[${x}, "${y}"]']`,
    );
    element.classList.add('ships');
  });
};

export { renderShips, getShipPlaces };
