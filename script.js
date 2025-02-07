const boardElement = document.getElementById("board");
const winnerElement = document.getElementById("winner");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
const board = Array(9).fill(null);

function createCell(index) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", () => makeMove(cell, index));
  return cell;
}

function makeMove(cell, index) {
  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  // Set fixed colors
  cell.style.backgroundColor =
    currentPlayer === "X" ? "rgb(255, 100, 100)" : "rgb(100, 255, 100)";

  if (checkWinner()) {
    winnerElement.textContent = `${currentPlayer} wins!`;
  } else if (board.every((cell) => cell)) {
    winnerElement.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function initializeBoard() {
  boardElement.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    boardElement.appendChild(createCell(i));
  }
  winnerElement.textContent = "";
  currentPlayer = "X";
  board.fill(null);
}

restartButton.addEventListener("click", initializeBoard);

// Initialize the game on page load
initializeBoard();
