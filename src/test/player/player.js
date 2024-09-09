import Gameboard from '../gameboard/gameboard';

// use the return value for adding a classList for an element
const HelperFunction = () => {
  const IsHit = ({ info }) => {
    const INFO = info;
    return typeof INFO === 'object';
  };

  const DisableClick = ({ condition }) => {
    const BOOL = condition;
    if (BOOL) {
      return 'disable-pointer';
    }

    return 'enable-pointer';
  };

  const GetRandomNumber = ({ min, max }) =>
    Math.floor(Math.random() * (max + 1 - min) + min);

  const CreateGrid = () => {
    const ARRAY = [];
    let asciiOfA = 97;
    let num = 1;

    for (let i = 0; i < 100; i += 1) {
      if (asciiOfA > 106) {
        asciiOfA = 97;
        num += 1;
      }
      ARRAY[i] = [num, String.fromCharCode(asciiOfA)];
      asciiOfA += 1;
    }

    return ARRAY;
  };

  const GetRandomShipPlacement = () => {
    const AXE = ['vertical', 'horizontal'];
    const SHIPS = ['CARRIER', 'BATTLESHIP', 'SUBMARINE', 'CRUISE', 'DESTROYER'];

    const RANDOMNUMBER = GetRandomNumber({ min: 0, max: 99 });
    const AXISRAND = GetRandomNumber({ min: 0, max: 1 });
    const SHIPRAND = GetRandomNumber({ min: 0, max: 4 });

    const COORDINATE = CreateGrid()[RANDOMNUMBER];
    const AXIS = AXE[AXISRAND];
    const SHIP = SHIPS[SHIPRAND];

    return { COORDINATE, AXIS, SHIP };
  };

  return {
    IsHit,
    DisableClick,
    GetRandomNumber,
    CreateGrid,
    GetRandomShipPlacement,
  };
};

const BasicBattleshipCPU = () => {
  const VISITED = [];
  const COORDINATES = [];

  // coordinate randomizer
  const SetUnvisited = () => {
    const { GetRandomNumber, CreateGrid } = HelperFunction();
    const RANDOMNUMBER = GetRandomNumber({ min: 0, max: 99 });
    const [x, y] = CreateGrid()[RANDOMNUMBER];

    if (!VISITED.includes(`${x}-${y}`)) {
      VISITED.push(`${x}-${y}`);
      COORDINATES.push([x, y]);
      return [x, y];
    }

    if (VISITED.length === 100) {
      return [x, y];
    }

    return SetUnvisited();
  };

  const AttackPlayerSquare = ({
    hitInfo,
    status,
    player,
    gameboard,
    array = [],
  }) => {
    const ISMISSED = hitInfo;
    const STAT = status;

    const ISPLAYERSHIPSSUNK = player.IsShipAllSunk({
      enemyGameboard: gameboard.SHIPS,
    });

    if (ISPLAYERSHIPSSUNK) {
      return array;
    }

    if (ISMISSED === false) {
      return array;
    }
    if (STAT === true) {
      return array;
    }

    const COORDINATE = SetUnvisited();
    const ATTACKINFO = gameboard.ReceiveAttack({
      coordinate: COORDINATE,
    });

    const { IsHit } = HelperFunction();
    const ISSHIPMISSED = IsHit({ info: ATTACKINFO });

    return array.concat(
      { COORDINATE, ISSHIPMISSED },
      AttackPlayerSquare({
        hitInfo,
        gameboard,
        status: ISSHIPMISSED,
        array,
        player,
      }),
    );
  };

  return {
    VISITED,
    COORDINATES,
    SetUnvisited,
    AttackPlayerSquare,
  };
};

const computersGameboard = Object.assign(Gameboard(), BasicBattleshipCPU());

const playersGameboard = Gameboard();

export { playersGameboard, computersGameboard, HelperFunction };
