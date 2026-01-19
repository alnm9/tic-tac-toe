const GameController = (function () {
    function Gameboard() {
        const board = [];
        let winner = "";

        for (let i = 0; i <= 8; i++) {
            board.push("");
        }

        return { board, winner };
    }


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
    const playBoard = Gameboard();
    let activePlayer = players[0];
    let turns = 0;

    const getTurnsNumber = () => turns;


    function createPlayers() {
        let p1 = prompt("Player 1 name:");
        if (p1 == "" || typeof p1 !== "string") p1 = "Player 1";


        let p2 = prompt("Player 2 name:");

        while (p2 == p1) {
            alert("Can't have same name!");
            p2 = prompt("Player 2 name:");
        }
        if (p2 == "" || typeof p2 !== "string") p2 = "Player 2";


        players[0].name = p1;
        players[1].name = p2;

    }

    const showBoard = () => playBoard.board;


    const switchTurn = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    };

    const getPlayerTurn = () => {
        console.log(`It's ${activePlayer.name}'s turn!`);
        return `It's ${activePlayer.name}'s turn!`;
    };

    const getWinner = () => playBoard.winner;



    const checkWinCondition = () => {

        function signEquality(n1, n2, n3) {

            for (let i = 0; i < 2; i++) {
                if (playBoard.board[n1] === playBoard.board[n2] &&
                    playBoard.board[n1] === playBoard.board[n3] &&
                    playBoard.board[n1] === players[i].sign) {

                    playBoard.winner = players[i].name;

                    const gameDisplayContainer = document.querySelector(".game-container");
                    const arrayContainer = Array.from(gameDisplayContainer.children);
                    arrayContainer[n1].setAttribute("style", "background-color: #b73a57c2");
                    arrayContainer[n2].setAttribute("style", "background-color: #b73a57c2");
                    arrayContainer[n3].setAttribute("style", "background-color: #b73a57c2");


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
        turns = 0;

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
            switchTurn();
            turns++;
        };



        if (checkWinCondition()) {
            console.log(`${getWinner()} has won!`);
            return;
        }


        if (turns === 9 && playBoard.winner == "") {
            console.log("It's a draw!");
            return;
        }

    };

    return { getPlayerTurn, playRound, showBoard, resetGame, getWinner, getTurnsNumber };

})();




const GameRender = (function () {
    const board = GameController.showBoard();

    const gameDisplayContainer = document.querySelector(".game-container");
    const resetBtn = document.querySelector("#start");

    renderBoard();
    renderText();

    function renderText() {
        const playerTurnText = document.querySelector("#game-text");
        playerTurnText.setAttribute("style", "color: white");

        playerTurnText.textContent = GameController.getPlayerTurn();

        if ((GameController.getWinner()) !== "") {
            playerTurnText.textContent = `${GameController.getWinner()} has won!`;
            playerTurnText.setAttribute("style", "color: #f1b72f");
        }

        if (GameController.getWinner() == "" && GameController.getTurnsNumber() === 9) {
            playerTurnText.textContent = "It's a draw!";
            playerTurnText.setAttribute("style", "color: #fd5056");
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
            if ((GameController.getWinner()) !== "" || (GameController.getWinner() == "" && GameController.getTurnsNumber() === 9)) {
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
