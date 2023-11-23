const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.statusText');
const restartBtn = document.querySelector('.restart');
const winnerContainer = document.querySelector('.winnerContainer');
const winnerText = document.querySelector('.winnerText');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

let options = ['', '', '', '', '', '', '', '', '', ];
let currentPlayer = 'X'; 
let running = false;

startGame();

function startGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked ));
    restartBtn.addEventListener('click', restartGame );
    statusText.textContent = `${currentPlayer}'s turn.`;
    running = true;
};

function cellClicked(){
    const index = this.getAttribute('cellIndex');
    if(options[index] != '' || !running){
        return;
    };
    updateCell(this, index);
    checkWinner();
};

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if(currentPlayer == 'X'){
        cell.className = 'cell red';
    } else if(currentPlayer == '0'){
        cell.className = 'cell blue';
    }
};

function changePlayer(){
    currentPlayer = currentPlayer == 'X' ? '0' : 'X';
    statusText.textContent = `${currentPlayer}'s turn.`;
};

function checkWinner(){
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == '' || cellB == '' || cellC == ''){
            continue;
        };
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    };

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;

        winnerContainer.style.display = 'block';
        winnerText.textContent = `${currentPlayer} wins!`
        restartBtn.className = 'restart large';

        if(currentPlayer == 'X'){
            winnerText.className = 'winnerText redWin'
        } else if( currentPlayer == '0'){
            winnerText.className = 'winnerText blueWin'
        }
    } else if(!options.includes('')){
        statusText.textContent = `Draw!`;
        winnerText.className = 'winnerText';
        winnerContainer.style.display = 'block';
        winnerText.textContent = 'Draw!'
        restartBtn.className = 'restart large';
        running = false;
    } else{
        changePlayer();
    }
};

function restartGame(){
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', '', ];
    statusText.textContent = `${currentPlayer}'s turn.`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
    winnerContainer.style.display = 'none';
    winnerText.textContent = '';
    restartBtn.className = 'restart';
    running = true;
};