import './css/style.css';
import AttackCycles from './js/attack-cycle';
import { RenderShips } from './js/render-ships';
import RenderGrid from './js/render-grid';
import TopNotification from './js/pop-up';
import { Restart, removeGrid } from './js/restart';
import RandomShipsPlacement from './test/generate_ship_coordinates/generate-ship-coordinates';
import {
  HelperFunction,
  ComputerGameboard,
  PlayerGameboard,
} from './test/player/player';
import StartGame from './js/start-game';
import Icon from './img/battleship-logo.svg';

window.addEventListener('DOMContentLoaded', () => {
  const HEADER = document.querySelector('header');
  HEADER.setAttribute('id', 'header');
  const LOGO = new Image();
  LOGO.src = Icon;
  HEADER.appendChild(LOGO);

  const YEARDATE = document.querySelector('.year-date');
  YEARDATE.textContent = `${new Date().getFullYear()}`;

  // basic ui for starting game
  const STARTDIALOG = StartGame();
  HEADER.appendChild(STARTDIALOG);

  const STARTGAME = document.querySelector('.start-game');
  STARTDIALOG.showModal();

  // close modal on start
  STARTGAME.addEventListener('click', () => {
    STARTDIALOG.close();
    STARTDIALOG.classList.toggle('hide-modal');
  });

  // initialize grid elements on parent elements with preset coordiantes
  RenderGrid({
    parentElement: '.first-gameboard-grid',
  });
  RenderGrid({
    parentElement: '.second-gameboard-grid',
  });

  const RANDSHIPPLACE1 = RandomShipsPlacement().SetShipsPlaces({
    places: [],
    placed: new Set(),
    helperFunction: HelperFunction,
  });
  const RANDSHIPPLACE2 = RandomShipsPlacement().SetShipsPlaces({
    places: [],
    placed: new Set(),
    helperFunction: HelperFunction,
  });

  const { playersGameboard } = PlayerGameboard();
  const { computersGameboard } = ComputerGameboard();

  RANDSHIPPLACE1.forEach((element) =>
    playersGameboard.SHIPPLACES.push(element),
  );
  RANDSHIPPLACE2.forEach((element) =>
    computersGameboard.SHIPPLACES.push(element),
  );

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

  RenderShips({
    gameboard: playersGameboard,
    gameboardElement: '.first-gameboard-grid',
  });

  TopNotification({ parent: 'header#header' }).button.addEventListener(
    'click',
    () =>
      Restart({
        firstParent: '.first-gameboard-grid',
        secondParent: '.second-gameboard-grid',
        firstGrid: '.first-gameboard-grid > div',
        secondGrid: '.second-gameboard-grid > div',
      }),
  );

  const WINNER = document.querySelector('.announce-winner');
  const RESTART = document.querySelector('.restart');
  RESTART.addEventListener('click', () => {
    WINNER.classList.remove('player-winner');
    WINNER.classList.remove('not-yet');
  });

  const CPUGRID = document.querySelector('.second-gameboard-grid');
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
});
