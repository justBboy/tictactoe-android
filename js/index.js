
var Game = {
    huPlayer : "O",
    aiPlayer : "X",
    winCombos : [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ],

    cells : document.querySelectorAll(".cell"),

    init: function(){
        document.querySelector(".endgame").style.display = "none";
        this.origBoard = Array.from(Array(9).keys());
        for(var i=0; i<this.cells.length; i++){
            this.cells[i].innerText = "";
            this.cells[i].style.removeProperty('background-color');
            this.turnClickHandler = this.turnClick.bind(this)
            this.cells[i].addEventListener("click", this.turnClickHandler, false)
        }
    },

    turnClick : function(ev){
        if(typeof this.origBoard[ev.target.id] == "number"){
            this.turn(ev.target.id, this.huPlayer);
            if (!this.checkTie()) this.turn(this.bestSpot(), this.aiPlayer);
        }
    },

    turn : function(squareId, player){
        this.origBoard[squareId] = player;
        console.log(this.origBoard);
        document.getElementById(squareId).innerText = player;
        var gameWon = this.checkWin(this.origBoard, player);
        if (gameWon) this.gameOver(gameWon)
    },

    checkWin: function(board, player){
        var plays = board.reduce((a, e, i) => 
        (e===player) ? a.concat(i) : a, [])
        var gameWon = null

        for (var [index, win] of this.winCombos.entries()){
            if (win.every(elem => plays.indexOf(elem) > -1)){
                gameWon = {index: index, player: player}
                break;
            }
        }
        return gameWon;
    },

    gameOver: function(gameWon){
        for (var index of this.winCombos[gameWon.index]){
            document.getElementById(index).style.backgroundColor = gameWon.player == this.huPlayer ? "blue" : "red";
        }

        for (var i=0; i<this.cells.length; i++){
            this.cells[i].removeEventListener("click", this.turnClickHandler, false);
        }

        this.declareWinner(gameWon.player == this.huPlayer ? "You win" : "You Lose");
    },

    declareWinner: function(who){
        document.querySelector(".endgame").style.display = "block";
        document.querySelector(".endgame .text").innerText = who;
    },

    emptySquares: function(){
        return this.origBoard.filter(s => typeof s == "number");
    },

    bestSpot: function(){
        return this.emptySquares()[0];
    },

    checkTie: function(){
        if(this.emptySquares().length==0){
            for(var i=0; i< this.cells.length; i++){
                this.cells[i].style.backgroundColor = "green";
                this.cells[i].removeEventListener('click', this.turnClickHandler, false);
            }
            declareWinner("Tie Game");
            return true;
        }
        return false;
    }

}

Game.init();