const createGrid = () => {
  const array = [];
  let asciiOfA = 97; // -> 106 ---> a b c d e f g h i j;
  let num = 1; // -> 10 ---> 1 2 3 4 5 6 7 8 9 10;

  for (let i = 0; i < 100; i += 1) {
    if (asciiOfA > 106) {
      asciiOfA = 97;
      num += 1;
    }
    array[i] = `[${num}, "${String.fromCharCode(asciiOfA)}"]`;
    asciiOfA += 1;
  }
  return array;
};

const playersGameboardGrid = ({ parentElement }) => {
  const parent = document.querySelector(`${parentElement}`);
  const coordinates = createGrid();

  coordinates.forEach((element) => {
    const div = document.createElement('div');
    div.setAttribute('data-pair-coordinate', element);
    parent.appendChild(div);
  });

  return parent;
};

export default playersGameboardGrid;
