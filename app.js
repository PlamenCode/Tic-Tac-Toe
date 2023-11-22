const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.statusText');
const restartBtn = document.querySelector('.restart');
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
        // winnerText.style.display = 'block';
    } else if(!options.includes('')){
        statusText.textContent = `Draw!`;
        // winnerText.style.display = 'block';
        running = false;
    } else{
        changePlayer();
    }
};

function restartGame(){
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', '', ];
    statusText.textContent = `${currentPlayer}'s turn.`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
};