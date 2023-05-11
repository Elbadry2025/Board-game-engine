package Tic_Tac_Toe

import java.awt.{Image, RenderingHints, Toolkit}
import java.awt.image.BufferedImage
import java.io.File
import javax.imageio.ImageIO
import scala.swing.Action.NoAction.title
import scala.swing.{BorderPanel, Color, Dimension, Graphics2D, GridPanel, Image, Label, MainFrame}

def TicTacToeController(move: String, state: (Array[Array[Char]], Int)): (Boolean, Array[Array[Char]]) =
{
  val indexedMove = changeLettersToIndex(move)

  if(indexedMove.length != 1)
    return (false, state(0))
  val cell = indexedMove(0)
  val x = 3 - cell(1); val y = cell(0);
  val board:Array[Array[Char]] = state(0);

  if (x < 0 || y < 0 || x >= 3 || y >= 3 || board(x)(y) != 'e')
    return (false, state(0));
  val turn = state(1);

  if (turn == 0)
    board(x)(y) = 'X';
  else
    board(x)(y) = 'O';

  (true, board)
}

def initializeTicTacToeBoard() = {
  val board = Array.ofDim[Char](3, 3)
  var idx = 0;
  while(idx < 3)
  {
    var idx2 = 0;
    while(idx2 < 3)
    {
      board(idx)(idx2) = 'e'
      idx2 = idx2 + 1
    }
    idx = idx + 1
  }
  board
}

//def TicTacToeDrawer(board: Array[Array[Char]]): Unit = {
//  var idx = 0;
//  while(idx < 3)
//  {
//    var idx2 = 0;
//    while(idx2 < 3)
//    {
//      print(board(idx)(idx2) + " ")
//      idx2 = idx2 + 1
//    }
//    println()
//    idx = idx + 1
//  }
//}
def changeLettersToIndex = (move: String) =>
  move.split(' ').map(arr => arr.map(c => if(c.isLetter) c.toInt - 'a'.toInt  else c.toInt - '0'.toInt));

def TicTacToeDrawer(board: Array[Array[Char]]): Unit = {
  val darkSquare = new Color(209, 139, 71)
  val lightSquare = new Color(255, 206, 158)

  val letters = Array("A", "B", "C", "D", "E", "F", "G", "H")
  val numbers = Array("1", "2", "3", "4", "5", "6", "7", "8")


  val boardGUI = new GridPanel(3, 3) {
    preferredSize = new Dimension(450, 450)
    override def paintComponent(g: Graphics2D) = {
      super.paintComponent(g)
      val pieceSize = 150
      for (i <- 0 until 3) {
        for (j <- 0 until 3) {
          val squareColor = if ((i + j) % 2 == 0) lightSquare else darkSquare
          g.setColor(squareColor)
          g.fillRect(j * pieceSize, i * pieceSize, pieceSize, pieceSize)
            if(board(i)(j)!='e'){
              g.drawImage(getPath(i, j, board), j * pieceSize, i * pieceSize, pieceSize, pieceSize, null)
            }
        }
      }
    }
  }


  val rowLabels = new GridPanel(8, 1) {
    preferredSize = new Dimension(17, 512)
    for (i <- 0 until 8) {
      contents += new Label(numbers(7 - i))
    }
  }
  val colLabels = new GridPanel(1, 8) {
    preferredSize = new Dimension(512, 17)
    for (j <- 0 until 8) {
      contents += new Label(letters(j))
    }
  }

  val frame = new MainFrame {
    title = "Tic_Tac_Toe Board"
    contents = new BorderPanel {
      add(boardGUI, BorderPanel.Position.Center)
      add(rowLabels, BorderPanel.Position.West)
      add(colLabels, BorderPanel.Position.South)
    }
    pack()
    centerOnScreen()
    open()
  }
}
def getPath(i: Int, j: Int, board: Array[Array[Char]]):Image = board(i)(j) match{
  case 'X' => getPieceImage('X')
  case 'O' => getPieceImage('O')
  case _ => null
}
def getPieceImage(pieceName: Char): Image = {
  //  val colorString = if (isWhite) "white" else "black"
  val img = ImageIO.read(new File(s"src/main/scala/pieces/tic_tac_toe/$pieceName.png"))
  val resizedImg = img.getScaledInstance(64, 64, Image.SCALE_SMOOTH)
  val bImg = new BufferedImage(64, 64, BufferedImage.TYPE_INT_ARGB)
  val g2d = bImg.createGraphics()
  g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON)
  g2d.drawImage(resizedImg, 0, 0, null)
  g2d.dispose()
  Toolkit.getDefaultToolkit().createImage(bImg.getSource())
}