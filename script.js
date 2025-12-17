function Gameboard() {
    const board = [];

    for (let i = 0; i <= 8; i++) {
        board.push("");
    }

    return { board };
}


const MakePlayers = (() => {
    let player1 = prompt("Player 1 name:");
    let player2 = prompt("Player 2 name:");
    return [player1, player2];
})()




const GameController = (function (player1, player2) {
    const players = [
        {
            name: player1,
            sign: "x"
        },
        {
            name: player2,
            sign: "0"
        }
    ];


    const playBoard = Gameboard();

    const showBoard = () => {
        return playBoard.board;
    };

    let activePlayer = players[0];

    const switchTurn = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    };

    const getPlayerTurn = () => {
        console.log(`It's ${activePlayer.name}'s turn!`);
    };


    const checkWinCondition = () => {

        function signEquality(n1, n2, n3) {

            for (let i = 0; i < 2; i++) {
                if (playBoard.board[n1] === playBoard.board[n2] &&
                    playBoard.board[n1] === playBoard.board[n3] &&
                    playBoard.board[n1] === players[i].sign) {

                    console.log(`Player ${players[i].name} has won!`);
                    return true;

                }
            }
        }

        if (signEquality(0, 1, 2) ||
            signEquality(3, 4, 5) ||
            signEquality(6, 7, 8) ||
            signEquality(0, 3, 6) ||
            signEquality(1, 4, 7) ||
            signEquality(0, 4, 8) ||
            signEquality(2, 4, 6)) {

            return true;
        }

    };


    const resetGame = () => {
        console.clear();
        players[0].name = prompt("Player 1 name:");
        players[1].name = prompt("Player 2 name:");
        activePlayer = players[0];
        playBoard.board = ["", "", "", "", "", "", "", "", ""];
        console.log(`Players are -- ${players[0].name} -- and -- ${players[1].name} --!`);

    }

    console.log(`Players are -- ${players[0].name} -- and -- ${players[1].name} --!`);
    getPlayerTurn();


    const playRound = (n) => {

        const cloneBoard = (playBoard.board).map((x) => x);

        console.log(`Player ${activePlayer.name} puts ${activePlayer.sign} in board array index ${n}`);
        playBoard.board[n] = activePlayer.sign;

        if (cloneBoard[n] !== "") {
            playBoard.board[n] = cloneBoard[n];
            console.log("Place already occuppied. Try again!");

        } else {

            if (checkWinCondition() === true) {
                resetGame();
            }

            switchTurn();
            getPlayerTurn();
            showBoard();
        };

    };

    return { getPlayerTurn, playRound, showBoard, resetGame };

})(MakePlayers[0], MakePlayers[1]);




const GameRender = (function () {
    const board = GameController.showBoard();
    const gameDisplayContainer = document.querySelector(".game-container");

    renderBoard();


    function renderBoard() {

        if (gameDisplayContainer.childNodes.length > 1) {
            const boardCells = gameDisplayContainer.querySelectorAll("button");
            for (let i = 0; i < board.length; i++) {
                boardCells[i].textContent = board[i];
            }
        } else {
            for (let cell in board) {
                const boardCell = document.createElement("button");
                boardCell.classList.add("cell");
                boardCell.textContent = board[cell];
                gameDisplayContainer.appendChild(boardCell);
            }
        }



    }

    return { renderBoard }
    //render gameboard, creating grid cells for every array index
    //target every board cell to help with sign assignation
    //function that handles cell clicks
    //event handler that displays each players sign based on the function handler
})()
