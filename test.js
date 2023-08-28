// Naughts and Crosses

const gameBoard = (() => {
    let board = [];
    for (let row=0; row < 3; row++) {
        board[row] = [];
        for (let col=0; col < 3; col++) {
            board[row][col] = 0;
        };
    };

    let round = 0;
    let activePlayer = "X";

    return { 
        board, round, activePlayer
    }

})()

// Game Logic 

// Repeat following until game is won or all squares filled:
    
    // Player chooses square to mark
    const recordSqr = (row, col) => {
        let currentSym = gameBoard.activePlayer;

        if (gameBoard.board[row][col] === 0) {
            gameBoard.board[row][col] = currentSym
            return true
        } else {
            return false
        }
    }
    // Check if player has won game
        // return true if player won, else false

    const checkGameWon = () => {
        let currentSym = gameBoard.activePlayer;

        const lineCheck = sqr => sqr === currentSym;
        
        // row check
        for (let row=0; row < 3; row++){
            if (gameBoard.board[row].every(lineCheck)) return true;
        }
        
        // col check
        for (let col=0; col < 3; col++){
            let colArray = [];
            for (let row=0; row < 3; row++) {
                colArray.push(gameBoard.board[row][col])
            }
            if (colArray.every(lineCheck)) return true;
        }
        
        // Diagonal check
        
        // 0,0 to 2,2 diagonal
        let downDiagArray = [];
        for (let i=0; i<3; i++){
            downDiagArray.push(gameBoard.board[i][i])
        }
        if (downDiagArray.every(lineCheck)) return true;
        
        // 2,0 to 0,2 diagonal
        let upDiagArray = [];
        for (let row=2; row >= 0; row--){
            for (let col=0; col > 3; col++){
                upDiagArray.push(gameBoard.board[row][col])
            }
        }
        if (downDiagArray.every(lineCheck)) return true;
        
        return false;
    }

    const checkSquaresFilled = () => {
        for (let row = 0; row < 3; row++) {
            if (gameBoard.board[row].includes(0)){
                return false;
            }
        }
        return true;
    }

    const setActivePlayer = () => {
        let currentPlayer = gameBoard.activePlayer;
        gameBoard.activePlayer = currentPlayer === "X" ? "O" : "X";
    }
    
/*     if (checkGameWon(player)){
        // If game won, end game - declare player winner
    } else if (checkSquaresFilled(gameBoard)) {
        // else if all squares filled - declare tie
    } */

// Display

let gameSqrs = document.querySelectorAll(".gameSqr");

const displaySqr = (e) => {
    let currentSym = gameBoard.activePlayer;
    e.target.textContent = currentSym;
}

const playTurn = e => {
    let row = e.target.getAttribute("row");
    let col = e.target.getAttribute("col");

    if (recordSqr(row, col)){
        displaySqr(e);
        if (checkGameWon()){
            console.log(`Player ${gameBoard.activePlayer} has won`);
            gameSqrs.forEach(
                gameSqr => {
                    gameSqr.removeEventListener("click", playTurn)
                }
            )
        } else if (checkSquaresFilled()) {
            console.log("Draw")
            gameSqrs.forEach(
                gameSqr => {
                    gameSqr.removeEventListener("click", playTurn)
                }
            )
        } else {
            setActivePlayer()
        }
    }
}

gameSqrs.forEach(
    gameSqr => {
        gameSqr.addEventListener("click", playTurn)
    }
)