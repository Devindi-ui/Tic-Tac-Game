//Get DOM Elements
const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status-text');
const resetBtn = document.getElementById('resetBtn');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const drawScore = document.getElementById('drawScore');

//Game state variable
let board = []; //2D array to represent the game board
let currentPlayer = 'X' //track current player (X-human, O=computer)
let gameActive = true; //track if game is still active
let scores = {player: 0, computer: 0, draws: 0}; //score tracking

function initializeGame(){
    //create empty 3x3 board
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = 'Your Turn (X)';

    createBoard();
}

/**
 * create the vurtual game board
 */
function createBoard(){
    gameBoard.innerHTML = ''; //clear existing board

    //create 9 cell, 3x3 grid
    for (let row = 0; row < 3; row++){
        for (let col = 0; col < 3; col++){
            const cell = document.createElement('button');
            cell.classList.add('cell');
            cell.dataset.row = row; //store row position
            cell.dataset.col = col; //store column position

            cell.addEventListener('click', () =>
                handleCellClick(row, col, cell));

            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(row, col, cellElement){
    if(board[row][col] !== '' || !gameActive || currentPlayer !== 'X'){
        return;
    }

    //make the move
    makeMove(row, col, cellElement, 'X');

    if(checkGameEnd()) {
        return;
    }

    //switch to computer turn
    currentPlayer = 'O';
    statusText.textContent = 'Computer thinking...';

    setTimeout(() => {
        if(gameActive) {
            computerMove();
        }
    }, 1000);
}

function makeMove(row, col, cellElement, player){
    board[row][col] = player; //update board array;
    cellElement.textContent = player; //update visual display
    cellElement.classList.add(player.toLowerCase()); //add styling 
    cellElement.classList.add('animate'); //addclick animation
    cellElement.disabled = true; //disable the cell
}

/**
 * Computer AI move
 */
function computerMove(){
    /**
     * 1.Try to win
     * 2.Try to block player win
     * 3.Take center if available
     * 4.take random available spot
     */
    let move = findWinningMove('O') || //try to win
        findWinningMove('X') ||
        getCenterMove() || //Take center
        getRandomMove(); //random move
        console.log(move);
        

    if(move){
        const cellElement = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
        makeMove(move.row, move.col, cellElement, 'O');

        if (checkGameEnd()) {
            return;
        }

        //Switch to human player
        currentPlayer = 'X';
        statusText.textContent = 'Your Turn...';

    }

}


function findWinningMove(player){
    //check all empty cells to see if placing player's symbol would
    for(let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            if(board[row][col] === '') {
                //temporarly place the player's symbol
                board[row][col] = player;

                //check if this creates a winning combinations
                if(checkWinner()){
                    board[row][col] = '';
                    return {row, col};
                }

                board[row][col] = ''; //remove temporary placement
            }
        }
    }
    return null;
}

function getCenterMove(){
    if(board[1][1] === ''){
        return {row: 1, col: 1};
    }

    return null;
}

function getRandomMove(){
    const availableMoves = [];

    for (let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++){
            if(board[row][col] === ''){
                availableMoves.push({row, col});
            }
        }
    }    

    if(availableMoves.length > 0){
        const randomIndex = Math.floor(Math.random()*availableMoves.length);
        return availableMoves[randomIndex];
    }

    return null;
}

function checkWinner(){
    //check rows
    for (let row = 0; row < 3; row++){
        if (board[row][0] !== '' && 
            board[row][0] === board[row][1] && 
            board[row][1] === board[row][2]
        ){
            return board[row][0];
        }
    }

    //check column
    for (let col = 0; col < 3; col++){
        if (board[0][col] !== '' &&
            board[0][col] === board[1][col] &&
            board[1][col] === board[2][col]
        ){
            return board[0][col];
        }
    }

    //chech diagonal
    if ( board[0][0] !== '' &&
         board[0][0] === board[1][1] &&
         board[1][1] === board[2][2]
    ) {
        return board[0][0];
    }

    if ( board[0][2] !== '' &&
         board[0][2] === board[1][1] &&
         board[1][1] === board[2][0]
    ) {
        return board[0][2];
    }

    return null; //no winner found
}

function isBoardFull(){
    for (let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            if(board[row][col] === '') {
                return false; //found empty cell
            }
        }
    }
    return true; //all cells are filled
}

function resetGame(){
    gameBoard.style.opacity = '0.5'; //To make userfreindly

    setTimeout(() => {
        initializeGame();
        gameBoard.style.opacity = '1';
    }, 500);
}

function checkGameEnd(){
    const winner = checkWinner();

    if(winner){
        gameActive = false;
        highlightWinningCells();

        if(winner === 'X'){
            statusText.textContent = 'You Win! 🏆';
            scores.player++;
            playerScore.textContent = scores.player;
        }else{
            statusText.textContent = 'Computer Wins! 💡';
            scores.computer++;
            computerScore.textContent = scores.computer;
        }

        return true;
    }

    //check draw (board is full)
    if(isBoardFull()){
        gameActive = false;
        statusText.textContent = "It's a draw! ❌";
        scores.draws++;
        drawScore.textContent = scores.draws;
        return true;
    }

    return false;
}

function highlightWinningCells(){
    //check row winning combination
    for (let row = 0; row < 3; row++) {
        if (board[row][0] !== '' &&
            board[row][0] === board[row][1] &&
            board[row][1] === board[row][2]
        ) {
            for (let col = 0; col < 3; col++) {
                const cell = document.querySelector
                (`[data-row="${row}"][data-col="${col}"]`);
                cell.classList.add('winner');
            }
            return;
        }
    }

    //check col winning combination
    for (let col = 0; col < 3; col++) {
        if (board[0][col] !== '' &&
            board[0][col] === board[1][col] &&
            board[1][col] === board[2][col]
        ) {
            for (let row = 0; row < 3; row++) {
                const cell = document.querySelector
                (`[data-row="${row}"][data-col="${col}"]`);
                cell.classList.add('winner');
            }
            return;
        }
    }

    //check diagonals
    if (board[0][0] !== '' &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]
    ) {
        for (let i = 0; i < 3; i++) {
            const cell = document.querySelector
                (`[data-row="${i}"][data-col="${i}"]`);
            cell.classList.add('winner');
        }
        return;
    }

    if (board[0][2] !== '' &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]
    ) {
        for (let i=0; i < 3; i++) {
            for (let j = 2; j <= 0; j--){
                const cell = document.querySelector
                    (`[data-row="${i}"][data-col="${j}"]`);
                cell.classList.add('winner');
            }
        }
        return;
    }

}

document.addEventListener('DOMContentLoaded', function(){
    initializeGame();
    resetBtn.addEventListener('click', resetGame);
});