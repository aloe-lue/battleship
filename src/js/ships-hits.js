const shipsLength = {
  carrier: 5,
  battleship: 4,
  cruise: 3,
  submarine: 3,
  destroyer: 2,
};

// adds circle depending on the ship
const addCircleShipHits = ({ parent, ship }) => {
  const shipName = ship;
  const pElement = document.querySelector(`${parent}`);
  pElement.setAttribute('style', 'display: flex; gap: 0.25rem;');

  for (let i = 0; i < shipsLength[shipName]; i += 1) {
    const div = document.createElement('div');
    div.setAttribute(`data-${shipName}-hits`, `${i}`);
    div.style = `border: 1px solid gray; border-radius: 50%; height: 1rem; width: 1rem;`;
    pElement.appendChild(div);
  }

  return pElement;
};

export default addCircleShipHits;
