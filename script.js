// Tic Tac Toe Game

// Game Flow:

// Game Round Loop:
    // Player X turn:
        // Selects an empty square on gameboard
        // X appears on square
        // Check if game is won:
            // if game won, player X wins and game ends
            // else continue to player O's turn
        // Check if game is tie:
            // if no squares available, end game with tie
            // else continue to Player 0 turn

    // Player O turn:
        // Selects an empty square on gameboard
        // O appears on square
        // Check if game is won:
            // if game won, player O wins and game ends
            // else continue to player X's turn starts
        // Check if game is tie:
            // if no squares available, end game with tie
            // else continue to player X turn

// Display Logic 

// 1) Create/Display Gameboard in DOM
    // gameBoard Module
        // Contains array with coordinates of squares

    // displayController Module

// 2) Update Gameboard using logic
    // player Object


const gameBoard = (() => {
    let board = [];
    for (let row=0; row < 3; row++) {
        board[row] = [];
        for (let col=0; col < 3; col++) {
            board[row][col] = null;
        }
    }

    const checkWin = (sym) => {
        const lineCheck = sqr => sqr === sym;
    
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

    return { 
        board, checkWin
    }

})()

const playerFactory = (sym) => {
    const markSquare = (row, col) => {
        if (gameBoard.board[row][col] === null) {
            gameBoard.board[row][col] = sym
        }

        console.table(gameBoard.board)
    };

    return { markSquare };
};

const playerX = playerFactory("X");
const playerO = playerFactory("O");

// Game logic:

// Only start checking after third turn of first player
// After each marked square check the next adjacent squares
    // if the same mark continue an adjacent check




