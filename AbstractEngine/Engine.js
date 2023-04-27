
class Engine
{
    numOfPlayers;
    dimx;
    dimy;
    board;
    drawer;
    controller;

    constructor(numOfPlayers, dimx, dimy)//, color1, color2)
    {
        this.dimx = dimx;
        this.dimy = dimy;
        this.numOfPlayers = numOfPlayers;
        this.initializeBoardDimensions();
        this.initializeHTML();
        this.initializeBoardPieces();
        // initializeHTML(dimx, dimy)//, color1, color2);
    }
    initializeHTML(){
        let container = document.getElementById('board');
        for(let i=0;i<this.dimx;i++){
            for(let j = 0;j<this.dimy;j++){
                let element = document.createElement('div');
                element.id = String.fromCharCode('a'.charCodeAt(0) + j) + (this.dimy - i);
                container.appendChild(element);
            }
        }
        this.initializeCss();
    }
    initializeCss(){

    }

    initializeBoardDimensions()
    {
        this.board = new Array(this.dimx);
        for (var i = 0; i < this.dimx; i++)
            this.board[i] = new Array(this.dimy);
    }

    initializeBoardPieces()
    {
    }

    takeInputAndMoveToControllerAndDraw()
    {
        let moveString = document.getElementById("nameInput").value;
        this.controller.convertAndValidateInputAndMakeMove(moveString);
        this.drawer.draw();
        this.controller.printPlayerTurnMessage();
    }
}

class Piece
{
    constructor()
    {
    }

    getAsci()
    {
    }
}

class Move
{
    constructor() {
    }
}
