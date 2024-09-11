const StartGame = function AddDialogBeforeStartingTheGame() {
  const DIALOG = document.createElement('dialog');
  const DIV = document.createElement('div');
  const STARTGAME = document.createElement('div');
  const REPOSITION = document.createElement('div');

  STARTGAME.innerText = 'Start';
  REPOSITION.innerText = 'Randomize';
  STARTGAME.classList.add('start-dialog');
  STARTGAME.classList.add('start-game');
  REPOSITION.classList.add('reposition');

  DIALOG.appendChild(DIV);
  DIV.appendChild(STARTGAME);
  DIV.appendChild(REPOSITION);

  return DIALOG;
};

export default StartGame;
