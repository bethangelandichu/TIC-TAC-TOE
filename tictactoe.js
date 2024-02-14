

var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;
var playerOScore = 0;
var playerXScore = 0;
var winningScore = 10; // Define the winning score
var totalRounds = 0;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
    updateScoreboard(); // Initialize scoreboard
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); //ex) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') {
        //already taken spot
        return;
    }

    board[r][c] = currPlayer; //mark the board
    this.innerText = currPlayer; //mark the board on html

    //check winner
    checkWinner();

    if (!gameOver) {
        // If the game is not over, it's computer's turn
        computerTurn();
    }
}

function computerTurn() {
    // Generate random row and column indices until an empty spot is found
    let r, c;
    do {
        r = Math.floor(Math.random() * 3);
        c = Math.floor(Math.random() * 3);
    } while (board[r][c] !== ' ');

    // Make the computer's move
    board[r][c] = playerX;
    document.getElementById(r.toString() + "-" + c.toString()).innerText = playerX;

    // Check for winner after computer's move
    checkWinner();
}

function updateScoreboard() {
    document.getElementById("playerOScore").innerText = "Player O: " + playerOScore;
    document.getElementById("playerXScore").innerText = "Player X: " + playerXScore;
}

function updateScore(winner) {
    if (winner === playerO) {
        playerOScore++;
    } else if (winner === playerX) {
        playerXScore++;
    }
    updateScoreboard();

    // Check if any player has reached the winning score
    if (playerOScore === winningScore || playerXScore === winningScore) {
        // Display winner or perform any other action
        if (playerOScore === winningScore) {
            alert("Player O wins!");
        } else {
            alert("Player X wins!");
        }
        resetGame(); // Reset the game after a player reaches ten points
    } else {
        startNewRound(); // Start a new round if the game is not over
    }
}

function startNewRound() {
    totalRounds++;
    if (totalRounds >= 10) {
        alert("10 rounds played. Game over!");
        resetGame(); // Reset the game after 10 rounds
    }
}

function resetGame() {
    // Clear the board
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            board[r][c] = ' ';
            document.getElementById(r.toString() + "-" + c.toString()).innerText = "";
        }
    }

    // Reset game state
    gameOver = false;
    totalRounds = 0;
    playerOScore = 0;
    playerXScore = 0;
    currPlayer = playerO; // Reset player turn to playerO
    updateScoreboard();
}

function checkWinner() {
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            updateScore(board[r][0]); // Update score for the winner
            gameOver = true;
            return;
        }
    }

    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");
            }
            updateScore(board[0][c]); // Update score for the winner
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");
        }
        updateScore(board[0][0]); // Update score for the winner
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");
        tile.classList.add("winner");
        updateScore(board[0][2]); // Update score for the winner
        gameOver = true;
        return;
    }
}

