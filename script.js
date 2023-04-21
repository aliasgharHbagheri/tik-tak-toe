const playerTurn = document.querySelector(".display-player-turn");
const tiles = Array.from(document.querySelectorAll(".tile"));
const gameStatus = document.querySelector(".game-status");
const btnReset = document.querySelector(".btn-reset");

const PLAYER_X = "Player_X";
const PLAYER_O = "Player_O";
const TIE = "Tie"

let board = ["", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;


// the condition of placing the tiles to win
const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 9],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// check the tiles for each user action
const resultValidationHandler = () => {
    let endGame = false;
    for (let i = 0; i < winningCondition.length; i++) {

        const currentCondition = winningCondition[i];
        const tile_one = board[currentCondition[0]];
        const tile_two = board[currentCondition[1]];
        const tile_three = board[currentCondition[2]];

        if (tile_one === "" || tile_two === "" || tile_three === "") {
            continue;
        }

        if (tile_one === tile_two && tile_two === tile_three) {
            endGame = true;
            break;
        }
    }

    if (endGame) {
        announce(currentPlayer === "X" ? PLAYER_X : PLAYER_O);
        isGameActive = false;
        return;
    }

    if (!board.includes("")) announce(TIE);
}

// announcing win and loss status
const announce = (playerType) => {
    switch (playerType) {
        case "Player_X":
            gameStatus.innerHTML = `Player <span class="player-X">X'</span> Win`;
            break;
        case "Player_O":
            gameStatus.innerHTML = `Player <span class="player-O">O'</span> Win`;
            break;
        case "Tie":
            gameStatus.innerHTML = "Tie";
            break;
    }
    gameStatus.classList.remove("hide");
}


const isValidAction = (tile) => {
    if (tile.innerHTML === "X" || tile.innerHTML === "O") {
        return false
    }

    return true;
}


const updateBoard = (index) => {
    board[index] = currentPlayer;
}


// replacing each player after performing an action on a tile
const changePlayerHandler = () => {
    playerTurn.classList.remove(`player-${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurn.innerHTML = currentPlayer;
    playerTurn.classList.add(`player-${currentPlayer}`);
}

// executes user actions
const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
        tile.innerHTML = currentPlayer;
        tile.classList.add(`player-${currentPlayer}`);
        updateBoard(index);
        resultValidationHandler();
        changePlayerHandler();
    }
}


// restart the game and the tiles
const resetBoardHandler = () => {
    board = ["", "", "", "", "", "", "", ""];
    isGameActive = true;
    gameStatus.classList.add("hide");

    if (currentPlayer === "O") {
        changePlayerHandler();
    }

    tiles.forEach((tile) => {
        tile.innerHTML = "";
        tile.classList.remove("player-X");
        tile.classList.remove("player-O");
    })
}

tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
});

btnReset.addEventListener("click", resetBoardHandler);