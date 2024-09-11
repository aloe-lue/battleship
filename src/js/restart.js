import { RenderShips } from './render-ships';
import AttackCycles from './attack-cycle';
import RandomShipsPlacement from '../test/generate_ship_coordinates/generate-ship-coordinates';
import RenderGrid from './render-grid';
import {
  HelperFunction,
  PlayerGameboard,
  ComputerGameboard,
} from '../test/player/player';
import StartGame from './start-game';

const removeGrid = ({ parent, elements }) => {
  const ELEMENTS = elements;

  ELEMENTS.forEach((element) => {
    parent.removeChild(element);
  });
};

const Restart = ({ firstGrid, secondGrid, firstParent, secondParent }) => {
  const FG = document.querySelectorAll(`${firstGrid}`);
  const FP = document.querySelector(`${firstParent}`);
  const SG = document.querySelectorAll(`${secondGrid}`);
  const SP = document.querySelector(`${secondParent}`);

  // you want to do efficient clean up --- ayiie efficient daw
  removeGrid({ elements: FG, parent: FP });
  removeGrid({ elements: SG, parent: SP });
  RenderGrid({ parentElement: firstParent });
  RenderGrid({ parentElement: secondParent });

  // randomize two ships places for every player
  const RANDSHIPPLACES1 = RandomShipsPlacement().SetShipsPlaces({
    places: [],
    placed: new Set(),
    helperFunction: HelperFunction,
  });
  const RANDSHIPPLACES2 = RandomShipsPlacement().SetShipsPlaces({
    places: [],
    placed: new Set(),
    helperFunction: HelperFunction,
  });

  const { playersGameboard } = PlayerGameboard();
  const { computersGameboard } = ComputerGameboard();

  RANDSHIPPLACES1.forEach((element) =>
    playersGameboard.SHIPPLACES.push(element),
  );
  RANDSHIPPLACES2.forEach((element) =>
    computersGameboard.SHIPPLACES.push(element),
  );

  RenderShips({
    gameboard: playersGameboard,
    gameboardElement: '.first-gameboard-grid',
  });

  const HEADER = document.querySelector('header#header');
  const PREVDIALOG = document.querySelector('dialog');
  HEADER.removeChild(PREVDIALOG);

  const DIALOG = StartGame();
  HEADER.appendChild(DIALOG);
  DIALOG.showModal();

  const STARTGAME = document.querySelector('.start-game');
  STARTGAME.addEventListener('click', () => {
    DIALOG.close();
    DIALOG.classList.toggle('hide-modal');
  });

  const REPOSITION = document.querySelector('.reposition');
  REPOSITION.addEventListener('click', () => {
    while (playersGameboard.SHIPPLACES.length !== 0) {
      playersGameboard.SHIPPLACES.shift();
    }
    const PARENT = document.querySelector('.first-gameboard-grid');
    const PARENTCHILDS = document.querySelectorAll(
      '.first-gameboard-grid > div',
    );

    removeGrid({ parent: PARENT, elements: PARENTCHILDS });
    RenderGrid({ parentElement: '.first-gameboard-grid' });

    const RANDOMSHIPPLACES = RandomShipsPlacement().SetShipsPlaces({
      places: [],
      placed: new Set(),
      helperFunction: HelperFunction,
    });
    RANDOMSHIPPLACES.forEach((element) => {
      playersGameboard.SHIPPLACES.push(element);
    });

    RenderShips({
      gameboard: playersGameboard,
      gameboardElement: '.first-gameboard-grid',
    });
  });

  // starting a new game means starting to listen to newly made grid elements for a clicks
  const CPUGRID = document.querySelector('.second-gameboard-grid');
  CPUGRID.classList.toggle('disable-pointer');
  const CPUSQUARES = document.querySelectorAll('.second-gameboard-grid > div');

  CPUSQUARES.forEach((square) => {
    square.addEventListener(
      'click',
      (eventE) => {
        AttackCycles({
          eventE,
          cpuGrid: CPUGRID,
          computersGameboard,
          playersGameboard,
          HelperFunction,
        });
      },
      { once: true },
    );
  });
};

export { Restart, removeGrid };
