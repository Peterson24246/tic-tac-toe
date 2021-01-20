// gameBoard module to store all data and methods related to the board
const gameBoard = (() => {
    // Initialize game board with empty spaces
    let board = ['','','','','','','','',''];

    // Returns the current board status
    const getCurrentBoard = function() {
        return board;
    }

    // Check if attempted move is valid
    const _validMove = function(position) {
        return (board[position] === '')
    }

    // Place the correct marker at the desired location
    const placeMarker = function(position, marker) {
        if (_validMove(position)) {
            board[position] = marker;
        }
    }

    // Reset gameboard for a new game
    const _resetBoard = function() {
        board = ['','','','','','','','',''];
    }

    return {
        getCurrentBoard,
        placeMarker,
    }
})();


// Player factory function used to store data and methods related to each player
const Player = function(name, marker) {

};


// Controller module to run the display
const displayController = (() => {
    const generateBoard = function() {
        let boardDiv = document.querySelector('.game-board')
        // Create 9 tiles and add relevant classes/attributes
        for (let i = 0; i < 9; i++) {
            let tile = document.createElement('div')
            tile.classList.add('tile')
            tile.setAttribute('data-position', i);
            tile.textContent = 'Test';
            tile.addEventListener('click', gameController.makeMove)
            boardDiv.append(tile);
        }
    }

    // Updates the display with the provided gameboard parameter
    const updateBoard = function(gameBoard) {
        let tiles = document.querySelectorAll('.tile');
        for (let i = 0; i < 9; i++) {
            tiles[i].textContent = gameBoard[i];
        }
    }

    return {
        generateBoard,
        updateBoard,
    }

})();

// Module that controls the flow of the game
const gameController = (() => {
    // Keeps a running tally of how many turns have been played
    let turnCount = 1;
    // Keeps track of whether the game is over or not
    let gameOver = false;
    
    const makeMove = function(e) {
        // Doesn't move if game is already over
        if (gameOver) return;
        // Get's selected move and the player whose turn it is
        let position = e.target.dataset.position;
        let currentPlayer = _getCurrentPlayer();
        // Updates the gameboard and the display
        gameBoard.placeMarker(position, currentPlayer)
        displayController.updateBoard(gameBoard.getCurrentBoard())
        // Checks if turn won the game
        _checkGameOver(currentPlayer)
        
    }

    // Get the active player 
    const _getCurrentPlayer = function() {
        if (turnCount % 2 === 1) {
            return 'X';
        } else {
            return 'O';
        }
    }

    // Checks if a player has won the game, or if the game is a tie
    const _checkGameOver = function(currentPlayer){
        board = gameBoard.getCurrentBoard()
        // Check horizontal wins
        for (let i = 0; i < 9; i+=3) {
            if (board[i] !== '' && board[i] === board[i+1] && board[i] === board[i+2]) {
                _winGame();
            }
        }
        // Check vertical wins
        for (let i = 0; i < 3; i+=1) {
            if (board[i] !== '' && board[i] === board[i+3] && board[i] === board[i+6]) {
                _winGame();
                
            }
        }
        // Check diagonal wins
        if ((board[0] !== '' && board[0] === board[4] && board[0] === board[8])
            || (board[2] !== '' && board[2] === board[4] && board[2] === board[6])) {
                _winGame();
            }

        // Either ends game if someone won, or updates the turn counter
        if (!gameOver && turnCount >= 9) {
            _drawGame();
        } else {
            turnCount++;
        }  
    }

    const _winGame = function() {
        gameOver = true;
        console.log('Winner is: ' + _getCurrentPlayer())
    }

    const _drawGame = function() {
        gameOver = true;
        console.log('It\'s a draw!')
    }

    return {
        makeMove,
    }
})()


displayController.generateBoard()
