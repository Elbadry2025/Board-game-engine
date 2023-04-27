class Drawer
{
    board;
    dimx;
    dimy;

    constructor(board, boardCSS)
    {
        console.log("drawer constructor");
        this.board = board;
        this.boardCSS = boardCSS
        this.dimy = this.board[0].length;
        this.dimx = this.board.length;
        this.draw();
        this.initializeCssBoard()
    }

    draw()
    {
        console.log(this.board)
        for (let i = 0; i < this.dimy; i++) {
            for (let j = 0; j < this.dimx; j++) {
                let temp = this.convertIndicesToHTMLDivs(i, j)
                temp.textContent = ''
                let node = document.createTextNode(this.board[this.dimy - i - 1][j].getAsci())
                temp.appendChild(node);
            }
        }
    }
    initializeCssBoard(){
        console.log(this.boardCSS)
        for (let i = 0; i < this.boardCSS.length; i++)
            for (let j = 0; j < this.boardCSS[i].length; j++){
                this.initializeCssCell(this.boardCSS[i][j], this.convertIndicesToHTMLDivs(i, j))
            }
    }
    initializeCssCell(cell, divElement) {
        divElement.className = cell.className
        divElement.style.background = cell.color
        divElement.style.width = cell.width + 'px'
        divElement.style.height = cell.height + 'px'
        divElement.style.fontSize = cell.font + 'px'
        divElement.style.border = cell.border + 'px solid'
        if (cell.shape == "circle")
            divElement.style.borderRadius = '50%';
    }

    convertIndicesToHTMLDivs(i, j) {
        let colName = String.fromCharCode('a'.charCodeAt(0) + j)
        let rowNum = i+1
        return document.getElementById(colName + rowNum);
    }


}

class Cell {
    color
    width
    height
    font
    shape
    border

    constructor(color='#e59110', width=80, height=80, font=50, shape="square", border) {
        this.color = color
        this.width = width
        this.height = height
        this.font = font
        this.shape = shape
        this.className = 'cell'
        this.border = border
    }

}