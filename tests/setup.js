require ('@testing-library/jest-dom');

//Mock DOM Elements that game expects
beforeEach(() => {
    document.body.innerHTML = `
        <div class="game-container">
        <h1 class="game-title">Tic-Tac-Toe</h1>
        <div class="game-status">
            <p id="status-text">Your Turn (X)</p>
        </div>
        <div class="game-board" id="gameBoard">
        </div>
        <div class="game-controls">
            <button class="reset-btn" id="resetBtn">New Game</button>
        </div>
        <div class="score-board">
            <div class="score-item">
                <span>You (X):</span>
                <span id="playerScore">0</span>
            </div>
            <div class="score-item">
                <span>Computer (O):</span>
                <span id="computerScore">0</span>
            </div>
            <div class="score-item">
                <span>Draws:</span>
                <span id="drawScore">0</span>
            </div>
        </div>
    </div>
    <audio id="backgroundMusic">
        <source src="sounds/background.mp3" type="audio/mpeg">
     </audio>
     <audio id="clickSound">
        <source src="sounds/click.wav" type="audio/wav">
     </audio>
     <audio id="winSound">
        <source src="sounds/win.wav" type="audio/wav">
     </audio>
     <audio id="loseSound">
        <source src="sounds/lose.wav" type="audio/wav">
     </audio>
     <audio id="drawSound">
        <source src="" type="audio/wav">
     </audio>
      <div class="music-controls">
        <button id="musicToggle" class="music-btn">🎧</button>
      </div>
    `
});

/**
 * Mock window.matchMedia
 * browser API
 */
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListner: jest.fn(),
        removeListner: jest.fn(),
        addEventListner: jest.fn(),
        removeEventListner: jest.fn(),
        dispatchEvent: jest.fn()
    })),
});

//Mock audio API
global.Audio = jest.fn().mockImplementation(() => ({
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    load: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    volume: 1,
    currentTime: 0,
    duration: 0,
    loop: false 
}));

global.console = {
    ...console,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

//mock seTimeout and setInterval for testing
jest.useFakeTimers();