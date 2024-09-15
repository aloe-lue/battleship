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

  const GetSeparatedCoordinate = ({ SHIPHIT = [] }) => {
    const ARRAY = SHIPHIT;
    const NUMBER = ARRAY.map((element) => element[0]);
    const LETTER = ARRAY.map((element) => element[1]);
    return { NUMBER, LETTER };
  };

  return {
    IsHit,
    DisableClick,
    GetRandomNumber,
    CreateGrid,
    GetRandomShipPlacement,
    GetSeparatedCoordinate,
  };
};

const SmartBattleshipCPU = () => {
  const VISITED = new Set();
  const COORDINATES = new Set();

  const SetUnvisited = () => {
    const { GetRandomNumber } = HelperFunction();
    const x = GetRandomNumber({ min: 1, max: 10 });
    const yAscii = GetRandomNumber({ min: 97, max: 106 });
    const y = String.fromCharCode(yAscii);

    if (!VISITED.has(`${x}-${y}`)) {
      VISITED.add(`${x}-${y}`);
      return [x, y];
    }

    if (VISITED.size === 100) {
      return [x, y];
    }

    return SetUnvisited();
  };

  const SetUnvisitedAdjacentSlot = ({ array }) => {
    const ARRAY = array;

    const { GetRandomNumber } = HelperFunction();
    const ARRAYLEN = ARRAY.length - 1;
    const RAND = GetRandomNumber({ min: 0, max: ARRAYLEN });
    const [X, Y] = ARRAY[RAND];

    if (!VISITED.has(`${X}-${Y}`)) {
      VISITED.add(`${X}-${Y}`);
      return [X, Y];
    }

    const VISITEDANDUNVISITED = ARRAY.map((element) => {
      const [A, B] = element;
      return !VISITED.has(`${A}-${B}`);
    });

    if (!VISITEDANDUNVISITED.includes(true)) {
      return SetUnvisited();
    }

    return SetUnvisitedAdjacentSlot({ array: ARRAY });
  };

  const GetAdjacentSlot = ({ coordinate }) => {
    const ADJACENTSLOT = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];
    const [X, Y] = coordinate;
    const ADJACENT = ADJACENTSLOT.map((element) => {
      const [A, B] = element;
      return [X + A, Y.charCodeAt(0) + B];
    });
    const FILTERADJACENT = ADJACENT.filter((element) => {
      const [A, B] = element;
      return A >= 1 && A <= 10 && B >= 97 && B <= 106;
    });
    const PROCCESSEDGOODS = FILTERADJACENT.map((element) => {
      const [A, B] = element;
      return [A, String.fromCharCode(B)];
    });

    return PROCCESSEDGOODS;
  };

  const GetUnvisitedAdjacencySlot = ({ array = [] }) => {
    const ARRAY = array;

    return ARRAY.filter((element) => {
      const [X, Y] = element;
      return !VISITED.has(`${X}-${Y}`);
    });
  };

  const adjacentSlots = [];

  const AttackPlayerSquare = ({
    hitInfo,
    status,
    player,
    gameboard,
    array = [],
    shipHit,
  }) => {
    const ISMISSED = hitInfo;
    const STAT = status;

    const ISPLAYERSHIPSSUNK = player.IsShipAllSunk({
      enemyGameboard: gameboard.SHIPS,
    });

    // if all player ships have been sunk don't need to attack
    if (ISPLAYERSHIPSSUNK) {
      return array;
    }

    // if a player hit cpu ship don't attack yet
    if (ISMISSED === false) {
      return array;
    }

    // if this cpu missed don't attack yet
    if (STAT === true) {
      return array;
    }

    const { IsHit } = HelperFunction();

    if (adjacentSlots.length !== 0) {
      const COORDINATE = SetUnvisitedAdjacentSlot({ array: adjacentSlots });

      const ATTACKINFO = gameboard.ReceiveAttack({
        coordinate: COORDINATE,
      });

      // you want to know if you hit a ship or not this returns false if it's a hit otherwise true
      const ISSHIPMISSED = IsHit({ info: ATTACKINFO });

      // you want to store a strong references of adjacent slots
      if (!ISSHIPMISSED) {
        const ADJACENT = GetAdjacentSlot({ coordinate: COORDINATE });
        const CLEANADJACENT = GetUnvisitedAdjacencySlot({ array: ADJACENT });
        CLEANADJACENT.map((item) => adjacentSlots.push(item));
      }

      return array.concat(
        { COORDINATE, ISSHIPMISSED },
        AttackPlayerSquare({
          hitInfo,
          gameboard,
          status: ISSHIPMISSED,
          array,
          player,
          shipHit,
        }),
      );
    }

    // you want to attack player with random coordinate to pass for player to receive an attack
    const COORDINATE = SetUnvisited();
    const ATTACKINFO = gameboard.ReceiveAttack({
      coordinate: COORDINATE,
    });

    // you want to know if you hit a ship or not this returns false if it's a hit otherwise true
    const ISSHIPMISSED = IsHit({ info: ATTACKINFO });

    // you want to store a strong references of adjacent slots
    if (!ISSHIPMISSED) {
      const ADJACENT = GetAdjacentSlot({ coordinate: COORDINATE });
      const CLEANADJACENT = GetUnvisitedAdjacencySlot({ array: ADJACENT });
      CLEANADJACENT.map((item) => adjacentSlots.push(item));
    }

    return array.concat(
      { COORDINATE, ISSHIPMISSED },
      AttackPlayerSquare({
        hitInfo,
        gameboard,
        status: ISSHIPMISSED,
        array,
        player,
        shipHit,
      }),
    );
  };

  return {
    VISITED,
    COORDINATES,
    GetAdjacentSlot,
    GetUnvisitedAdjacencySlot,
    SetUnvisited,
    AttackPlayerSquare,
  };
};

const ComputerGameboard = () => {
  const computersGameboard = Object.assign(Gameboard(), SmartBattleshipCPU());
  return { computersGameboard };
};

const PlayerGameboard = () => {
  const playersGameboard = Gameboard();
  return { playersGameboard };
};

export { PlayerGameboard, ComputerGameboard, HelperFunction };
