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

displayController.generateBoard()
displayController.updateBoard(['x','','d','','','','','',''])
