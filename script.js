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
    console.log(`Players are -- ${players[0].name} -- and -- ${players[1].name} --!`);

    const playBoard = Gameboard();

    const showBoard = () => {
        console.log(playBoard.board);
    }

    let activePlayer = players[0];

    const switchTurn = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    }

    const getPlayerTurn = () => {
        console.log(`It's ${activePlayer.name} turn!`);
    }

    const playRound = (n) => {
        getPlayerTurn();
        console.log(`Player ${activePlayer.name} puts ${activePlayer.sign} in board array index ${n}`);
        //do a filter after every match to let out the impossible sign places
        playBoard.board[n] = activePlayer.sign;
        switchTurn();
    }


    return { getPlayerTurn, playRound, showBoard };
})(MakePlayers[0], MakePlayers[1]);



