function Gameboard() {
    const board = [];
    let winner = "";

    for (let i = 0; i <= 8; i++) {
        board.push("");
    }

    return { board, winner };
}



const GameController = (function () {
    const players = [
        {
            name: "player1",
            sign: "x"
        },
        {
            name: "player2",
            sign: "0"
        }
    ];

    createPlayers();

    function createPlayers() {
        let p1 = prompt("Player 1 name:");
        let p2 = prompt("Player 2 name:");
        while (p2 == p1) {
            alert("Can't have same name!");
            p2 = prompt("Player 2 name:");
        }
        players[0].name = p1;
        players[1].name = p2;



        if (players[0].name == "" || typeof players[0].name !== "string") players[0].name = "Player 1";
        if (players[1].name == "" || typeof players[1].name !== "string") players[1].name = "Player 2";
    }



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
        return `It's ${activePlayer.name}'s turn!`;
    };


    const checkWinCondition = () => {

        function signEquality(n1, n2, n3) {

            for (let i = 0; i < 2; i++) {
                if (playBoard.board[n1] === playBoard.board[n2] &&
                    playBoard.board[n1] === playBoard.board[n3] &&
                    playBoard.board[n1] === players[i].sign) {

                    playBoard.winner = players[i].name;

                    const gameDisplayContainer = document.querySelector(".game-container");
                    const arrayContainer = Array.from(gameDisplayContainer.children);
                    arrayContainer[n1].setAttribute("style", "background-color: blue");
                    arrayContainer[n2].setAttribute("style", "background-color: blue");
                    arrayContainer[n3].setAttribute("style", "background-color: blue");


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
            signEquality(2, 4, 6) ||
            signEquality(2, 5, 8)) {

            return true;
        }

    };


    const resetGame = () => {
        console.clear();
        createPlayers();

        activePlayer = players[0];
        for (let i = 0; i < playBoard.board.length; i++) {
            playBoard.board[i] = "";
        }
        playBoard.winner = "";

        console.log(`Players are -- ${players[0].name} -- and -- ${players[1].name} --!`);

    }

    console.log(`Players are -- ${players[0].name} -- and -- ${players[1].name} --!`);
    getPlayerTurn();


    const playRound = (cell) => {

        const cloneBoard = (playBoard.board).map((x) => x);

        console.log(`Player ${activePlayer.name} puts ${activePlayer.sign} in board array index ${cell}`);
        playBoard.board[cell] = activePlayer.sign;

        if (cloneBoard[cell] !== "") {
            playBoard.board[cell] = cloneBoard[cell];
            alert("Place already occuppied. Try again!");

        } else {

            if (checkWinCondition()) {
                console.log(`${getWinner()} has won!`)

                return
            }

            switchTurn();
        };

    };

    const getWinner = () => playBoard.winner;

    return { getPlayerTurn, playRound, showBoard, resetGame, getWinner };

})();




const GameRender = (function () {
    const board = GameController.showBoard();
    const gameDisplayContainer = document.querySelector(".game-container");
    const resetBtn = document.querySelector("#start");

    renderBoard();
    renderText();

    function renderText() {
        const playerTurnText = document.querySelector("#game-text");
        playerTurnText.textContent = GameController.getPlayerTurn();
        if ((GameController.getWinner()) !== "") {
            playerTurnText.textContent = `${GameController.getWinner()} has won!`;
        }

    }

    function renderBoard() {

        for (let i = 0; i < board.length; i++) {
            const boardCell = document.createElement("button");
            boardCell.classList.add("cell");
            boardCell.textContent = "";
            boardCell.dataset.index = i;
            gameDisplayContainer.appendChild(boardCell);
        }
    }

    function updateBoard() {
        const boardCells = gameDisplayContainer.querySelectorAll("button");

        for (let i = 0; i < board.length; i++) {
            boardCells[i].textContent = board[i];
        }

        boardCells.forEach((cell) => {
            if ((GameController.getWinner()) !== "") {
                cell.disabled = true;
            }
        })

    }

    function clickHandler(e) {
        const boardCell = e.target.dataset.index;
        GameController.playRound(boardCell);
        renderText();
        updateBoard();
    }

    function resetGame() {
        GameController.resetGame();
        while (gameDisplayContainer.hasChildNodes()) {
            gameDisplayContainer.removeChild(gameDisplayContainer.firstChild);
        }
        renderBoard();
        renderText();
    }

    gameDisplayContainer.addEventListener("click", clickHandler);
    resetBtn.addEventListener("click", resetGame);

})()
