document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const statusDisplay = document.getElementById('current-player');
  const restartButton = document.getElementById('restart');

  let currentPlayer = 'X';
  let gameActive = true;
  let gameState = ['', '', '', '', '', '', '', '', ''];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Crear las celdas del tablero
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }

  function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameState[index] !== '' || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
      statusDisplay.textContent = `¡${currentPlayer} gana!`;
      gameActive = false;
      return;
    }

    if (checkDraw()) {
      statusDisplay.textContent = 'Empate';
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = currentPlayer;
  }

  function checkWin() {
    return winningConditions.some(condition => {
      const [a, b, c] = condition;
      return (
        gameState[a] !== '' &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      );
    });
  }

  function checkDraw() {
    return gameState.every(cell => cell !== '');
  }

  function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = currentPlayer;
    document.querySelectorAll('.cell').forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('x', 'o');
    });
  }

  restartButton.addEventListener('click', restartGame);
});