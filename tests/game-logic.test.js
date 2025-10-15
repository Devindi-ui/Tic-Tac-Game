//import the game functions
const gameModule = require('../src/script/app.js');

describe('Tic-Tac-Toe Game Logic', () => {
    let board;

    beforeEach(() => {
        board = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
        gameModule.initializeGame();
    });

    describe('checkWinner function', () => {
        test('should detect horizontal win in forst row', () => {
            const testBoard = [
                ['0','0','0'],
                ['','',''],
                ['','','']
            ];

            expect(testCheckWinner(testBoard)).toBe('O');
        });
    })
});

function testCheckWinner(board) {
    // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] !== '' && 
        board[row][0] === board[row][1] && 
        board[row][1] === board[row][2]) {
      return board[row][0];
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] !== '' &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]) {
      return board[0][col];
    }
  }

  // Check diagonals
  if (board[0][0] !== '' &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]) {
    return board[0][0];
  }

  if (board[0][2] !== '' &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]) {
    return board[0][2];
  }

  return null;

}

function testIsBoardFull(board) {
    for(let row = 0; row < 3; row++) {
        for(let col = 0; col < 3; col++) {
            if(board[row][col] === '') {
                return false;
            }
        }
    }
    return true;
}