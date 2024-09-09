const AttackCycles = ({
  eventE,
  cpuGrid,
  computersGameboard,
  playersGameboard,
  HelperFunction,
}) => {
  const CPUGRID = cpuGrid;
  const e = eventE;

  // use this pair coordinate to parse the coordinate into literal js array
  const PAIRCOORDINATE = e.target.getAttribute('data-pair-coordinate');

  // computers gameboard receives an attack by clicking the board
  const RECEIVEATTACK = computersGameboard.ReceiveAttack({
    coordinate: JSON.parse(PAIRCOORDINATE),
  });

  // this is distorted and should need a refactor but anyway let me explain
  // if receive attack is object that means it's not a hit you read that right
  const ISMISSED = typeof RECEIVEATTACK === 'object';

  // helper function for assigning class for disabling element
  const NotifWin = ({ sunk }) => (sunk ? 'player-winner' : 'not-yet');
  const { DisableClick } = HelperFunction();

  // adds a classList on the clicked element
  e.target.classList.add(`${ISMISSED}`);

  // don't allow clicks
  CPUGRID.classList.toggle(`${DisableClick({ condition: ISMISSED })}`);

  // function that is returns random attack it's not intelligent but can be enhance
  const ATTACKTIME = computersGameboard.AttackPlayerSquare({
    hitInfo: ISMISSED,
    player: computersGameboard,
    gameboard: playersGameboard,
  });

  // should make it so it's slow in attacking
  ATTACKTIME.forEach((attack) => {
    const [LEFT, RIGHT] = attack.COORDINATE;
    const DIDIMISS = attack.ISSHIPMISSED;

    // application logics
    const PLAYERSQAURE = document.querySelector(
      `.first-gameboard-grid > div[data-pair-coordinate='[${LEFT}, "${RIGHT}"]']`,
    );
    PLAYERSQAURE.classList.add(`${DIDIMISS}`);

    // enable player to click on the square again if cpu got missed
    CPUGRID.classList.toggle(`${DisableClick({ condition: DIDIMISS })}`);
  });

  // check if computer's ships have all been sunked
  const ISSHIPALLSUNK = playersGameboard.IsShipAllSunk({
    enemyGameboard: computersGameboard.SHIPS,
  });

  const WINNERNOTIF = document.querySelector('.announce-winner');
  WINNERNOTIF.classList.toggle(`${NotifWin({ sunk: ISSHIPALLSUNK })}`);

  const DIDIWIN = computersGameboard.IsShipAllSunk({
    enemyGameboard: playersGameboard.SHIPS,
  });
  WINNERNOTIF.classList.toggle(`${NotifWin({ sunk: DIDIWIN })}`);

  const GetWinner = ({ opponent }) => {
    const OPPONENT = opponent;

    if (OPPONENT) {
      return 'CPU wins 🎉';
    }
    return 'Player wins 🎉';
  };

  const TOPNOTIF = document.querySelector('.winner');
  TOPNOTIF.textContent = GetWinner({ opponent: DIDIWIN });
};

export default AttackCycles;
