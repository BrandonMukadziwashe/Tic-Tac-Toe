//variable defintions for player text indicators
const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT

let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

//Keep track of blocks that have been clicked
let taken = Array(9).fill(null)

//Stores all possible combinations to win the game
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const currentPlayerElement = document.getElementById("current-player")
currentPlayerElement.textContent = "Current player: " + currentPlayer

const winnerPlayerElement = document.getElementById("winner-player")

//Highlight which combination has won the game
let winnerColor = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

//Starting the game
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) {
    const id = e.target.id

    if(!taken[id]) {
        taken[id] = currentPlayer
        e.target.innerText = currentPlayer
        if(playerHasWon() !== false) {
            let winning_blocks = playerHasWon()
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerColor)
            alert(currentPlayer + " has WON!")
            return 
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT: X_TEXT
        currentPlayerElement.textContent = "Current player: " + currentPlayer
    }
}



function playerHasWon() {
    for (const condition of winningCombinations) {
        let [a, b, c] = condition
        if (taken[a] && taken[a] == taken[b] && taken[a] == taken[c]) {
            return [a,b,c]
        }
    }
    return false 
}


restartBtn.addEventListener('click', restart)

function restart() {
    taken.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })
    playerText = 'Tic Tac Toe'
    currentPlayer = X_TEXT
}


//Initializing the game
startGame()
