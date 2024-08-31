const shipsLength = {
  carrier: 5,
  battleship: 4,
  cruise: 3,
  submarine: 3,
  destroyer: 2,
};

const createAnArrayOfNumbers = ({ shipName }) => {
  const shipL = shipsLength[shipName];
  const array = [];

  for (let i = 0; i < shipL; i += 1) {
    array[i] = i;
  }

  return array;
};

const addCircleShipHits = ({ parent, ship }) => {
  const shipName = createAnArrayOfNumbers({ shipName: ship });
  const parentElement = document.querySelector(`${parent}`);
  parentElement.classList.add('circles');

  shipName.forEach((element) => {
    const div = document.createElement('div');
    div.setAttribute(`data-${ship}-hits`, `${element + 1}`);
    div.classList.add('circle');
    parentElement.appendChild(div);
  });

  return parentElement;
};

export default addCircleShipHits;
