class Drawer
{
    board;
    dimx;
    dimy;

    constructor(board)
    {
        console.log("drawer constructor");
        this.board = board;
        this.dimy = this.board[0].length;
        this.dimx = this.board.length;
        this.draw();
    }

    draw()
    {
        for (let i = 0; i < this.dimy; i++) {
            for (let j = 0; j < this.dimx; j++) {
                let colName = String.fromCharCode('a'.charCodeAt(0) + j)
                let rowNum = this.dimy - i
                let temp = document.getElementById(colName + rowNum);
                temp.textContent = ''
                let node = document.createTextNode(this.board[this.dimy - i - 1][j].getAsci())
                temp.appendChild(node);
            }
        }
    }

}