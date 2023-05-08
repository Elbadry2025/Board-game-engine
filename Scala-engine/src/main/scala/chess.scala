package Chess
import Colors.{Colors, White}
import Pieces.{Empty, Pieces}
object Pieces extends Enumeration {
  type Pieces = Value
  val pawn = Value("pawn")
  val Knight = Value("Knight")
  val Bishop = Value("Bishop")
  val Rook = Value("Rook")
  val King = Value("King")
  val Queen = Value("Queen")
  val Empty = Value("Empty")
}
object Colors extends Enumeration {
  type Colors = Value
  val White = Value("White")
  val Black = Value("Black")
  val Empty = Value("Empty")
}

def initBoard(dimx: Int, dimy: Int):Array[Array[(Colors,Pieces)]]={
  var state = Array.ofDim[(Colors,Pieces)](dimx, dimy)
  (0 until dimx).foreach { row =>
    (0 until dimy).foreach { col =>
      state(row)(col) = (Colors.Empty,Pieces.Empty)
    }
  }
  state(0)(0) = (Colors.White,Pieces.Rook)
  state(0)(1) = (Colors.White,Pieces.Knight)
  state(0)(2) = (Colors.White,Pieces.Bishop)
  state(0)(3) = (Colors.White,Pieces.King)
  state(0)(4) = (Colors.White,Pieces.Queen)
  state(0)(5) = (Colors.White,Pieces.Bishop)
  state(0)(6) = (Colors.White,Pieces.Knight)
  state(0)(7) = (Colors.White,Pieces.Rook)
  (0 to 7).foreach(i=>state(1)(i)=(Colors.White,Pieces.pawn))

  state(7)(0) = (Colors.Black,Pieces.Rook)
  state(7)(1) = (Colors.Black,Pieces.Knight)
  state(7)(2) = (Colors.Black,Pieces.Bishop)
  state(7)(3) = (Colors.Black,Pieces.King)
  state(7)(4) = (Colors.Black,Pieces.Queen)
  state(7)(5) = (Colors.Black,Pieces.Bishop)
  state(7)(6) = (Colors.Black,Pieces.Knight)
  state(7)(7) = (Colors.Black,Pieces.Rook)
  (0 to 7).foreach(i=>state(6)(i)=(Colors.Black,Pieces.pawn))

  state
}

def chessController(state:(String,(Array[Array[(Colors,Pieces)]], Int))) : (Boolean, Array[Array[(Colors,Pieces)]]) = {
  val move = changeLettersToIndex(state(0))
  val moveFrom = (move(0)(1),move(0)(0))
  val moveTo = (move(1)(1),move(1)(0))
  val validatingMove = validate(state(1)(0), moveTo, moveFrom, state(1)(1))

  if(validatingMove) applyMove(state(1)(0), moveTo, moveFrom)
  (validatingMove,state(1)(0))
}

def getValidMove(board:Array[Array[(Colors,Pieces)]], moveFrom:(Int,Int)):List[(Int,Int)]={
  matchPieces(board(moveFrom(0))(moveFrom(1))(1),board,moveFrom)
}
def matchPieces(piece:Pieces, board:Array[Array[(Colors,Pieces)]],
                moveFrom:(Int,Int)):List[(Int,Int)] = piece match{
  case Pieces.Queen => addMovesStraigt(moveFrom, board)++addMovesDiagonal(moveFrom, board)
  case Pieces.King => addKingMoves(moveFrom, board)
  case Pieces.Rook => addMovesStraigt(moveFrom, board)
  case Pieces.Bishop => addMovesDiagonal(moveFrom, board)
  case Pieces.Knight => addKnightMoves(moveFrom, board)
  case Pieces.pawn => addPawnMoves(moveFrom, board)
  case Pieces.Empty => List.empty[(Int,Int)]
}
def addMovesInConsecutiveCellsChess(inc1:Int, inc2:Int, range:Int, point:(Int,Int),
                                    board:Array[Array[(Colors,Pieces)]],concatinate:Boolean): List[(Int,Int)] = {
  //  (1 to range)
  //    .takeWhile(i => checkValidPoint((point._1 + i * inc1, point._2 + i * inc2)))
  //    .takeWhile(i=>board(point._1 + i * inc1)(point._2 + i * inc2)._1 != board(point._1)(point._2)._1)
  //    .span(i=> board(point._1 + i * inc1)(point._2 + i * inc2)._1 == Colors.Empty)
  //    .map(i => (point._1 + i * inc1, point._2 + i * inc2)).toList

  val (satisfied, unsatisfied) = (1 to range)
    .takeWhile(i => checkValidPoint((point._1 + i * inc1, point._2 + i * inc2)))
    .takeWhile(i => board(point._1 + i * inc1)(point._2 + i * inc2)._1 != board(point._1)(point._2)._1)
    .span(i => board(point._1 + i * inc1)(point._2 + i * inc2)._1 == Colors.Empty)
  if(!concatinate) return satisfied.map(i => (point._1 + i * inc1, point._2 + i * inc2)).toList
  (satisfied ++ unsatisfied.take(1)).map(i => (point._1 + i * inc1, point._2 + i * inc2)).toList
}
def addMovesStraigt(point:(Int,Int),board:Array[Array[(Colors,Pieces)]]):List[(Int,Int)] ={
  List((1,0), (-1,0), (0,1), (0,-1))
    .flatMap(pair => addMovesInConsecutiveCellsChess(pair(0), pair(1), 8,point,board,true))
}

def addMovesDiagonal(point:(Int,Int),board:Array[Array[(Colors,Pieces)]]):List[(Int,Int)] ={
  List((1,1),(1,-1),(-1,1),(-1,-1))
    .flatMap(pair => addMovesInConsecutiveCellsChess(pair(0), pair(1), 8,point,board,true))
}

def addKingMoves(point:(Int,Int),board:Array[Array[(Colors,Pieces)]]):List[(Int,Int)] ={
  List((1,-1),(1,0),(1,1),(-1,-1),(-1,0),(-1,1),(0,-1),(0,1))
    .flatMap(pair => addMovesInConsecutiveCellsChess(pair(0), pair(1), 1,point,board,true))
}

def addKnightMoves(point:(Int,Int),board:Array[Array[(Colors,Pieces)]]):List[(Int,Int)] ={
  List((1,2),(1,-2),(-1,2),(-1,-2),(2,1),(2,-1),(-2,1),(-2,-1))
    .flatMap(pair => addMovesInConsecutiveCellsChess(pair(0), pair(1), 1,point,board,true))
}

def addPawnMoves (range:Int, point:(Int,Int), board:Array[Array[(Colors,Pieces)]]): List[(Int,Int)] = {
  (0 to 2).flatMap(i => if(i==0) addMovesInConsecutiveCellsChess((board(point._1)(point._2)._1
  match {case Colors.White => 1 case Colors.Black => -1}),
    0, range,point, board, false) else addMovesPawnDiagonal(point, board)).toList

}
// this is a repeated function because the attacks squares must be not empty
def addAttackInConsecutiveCellsPawn(inc1:Int, inc2:Int, range:Int, point:(Int,Int),
                                    board:Array[Array[(Colors,Pieces)]]): List[(Int,Int)] = {
  var res = (1 to range)
    .takeWhile(i => checkValidPoint((point._1 + i * inc1, point._2 + i * inc2)))
    .takeWhile(i=>(board(point._1 + i * inc1)(point._2 + i * inc2)._1 != Colors.Empty &&
      board(point._1 + i * inc1)(point._2 + i * inc2)._1 != board(point._1)(point._2)._1))
    .map(i => (point._1 + i * inc1, point._2 + i * inc2)).toList
  println(res)
  res
}

def addMovesPawnDiagonal(point:(Int,Int),board:Array[Array[(Colors,Pieces)]]):List[(Int,Int)] ={
  List((1,1),(1,-1)).flatMap(pair => addAttackInConsecutiveCellsPawn(pair(0), pair(1), 1,point,board))
}
def addPawnMoves(point:(Int,Int),board:Array[Array[(Colors,Pieces)]]):List[(Int,Int)] ={
  (point(0),board(point(0))(point(1))(0)) match
    case (1,Colors.White) => addPawnMoves(2, point, board)
    case (6,Colors.Black) => addPawnMoves(2, point, board)
    case (_,Colors.White) => addPawnMoves(1, point, board)
    case (_,Colors.Black) => addPawnMoves(1, point, board)
}


def checkValidPoint(point:(Int,Int)):Boolean ={
  !(point(0).min(point(1)) < 0 || point(0).max(point(1)) >= 8)
}

def validate(board:Array[Array[(Colors,Pieces)]], moveTo:(Int,Int), moveFrom:(Int,Int), turn:Int): Boolean ={
  if(board(moveFrom(0))(moveFrom(1))(0) != Colors.apply(turn)) return false
  getValidMove(board, moveFrom).contains(moveTo)
}

def applyMove(board:Array[Array[(Colors,Pieces)]], moveTo:(Int,Int), moveFrom:(Int,Int)): Unit ={
  board(moveTo(0))(moveTo(1)) = board(moveFrom(0))(moveFrom(1))
  board(moveFrom(0))(moveFrom(1)) = (Colors.Empty,Pieces.Empty)
}

def chessDrawer(board: Array[Array[(Colors,Pieces)]]) : Unit = {
  println("  " + (0 until 8).mkString("   "))
  (0 until 8).foreach { row =>
    (0 until 8).foreach { col => (row+col)%2 match
      case 0 => print(Console.CYAN_B + getAscii(row, col, board) + Console.RESET)
      case 1 => print(Console.BLACK_B + getAscii(row, col, board) + Console.RESET)
    }
    println("  " + row)
  }
  println
}

def getAscii(i: Int, j: Int, board: Array[Array[(Colors,Pieces)]]):String = board(i)(j) match{
  case (Colors.White, Pieces.Rook) => Console.RED + " ♜ " + Console.RESET
  case (Colors.White, Pieces.Knight) => Console.RED + " ♞ " + Console.RESET
  case (Colors.White, Pieces.Bishop) => Console.RED + " ♝ " + Console.RESET
  case (Colors.White, Pieces.Queen) => Console.RED + " ♛ " + Console.RESET
  case (Colors.White, Pieces.King) => Console.RED + " ♚ " + Console.RESET
  case (Colors.White, Pieces.pawn) => Console.RED + " ♟ " + Console.RESET
  case (Colors.Black, Pieces.Rook) => Console.WHITE + " ♖ " + Console.RESET
  case (Colors.Black, Pieces.Knight) => Console.WHITE + " ♘ " + Console.RESET
  case (Colors.Black, Pieces.Bishop) => Console.WHITE + " ♗ " + Console.RESET
  case (Colors.Black, Pieces.Queen) => Console.WHITE + " ♕ " + Console.RESET
  case (Colors.Black, Pieces.King) => Console.WHITE + " ♔ " + Console.RESET
  case (Colors.Black, Pieces.pawn) => Console.BLUE + " ♙ " + Console.RESET
  case _ => "    "
}


import Colors.Value
import Pieces.Value

import scala.swing.*
import java.awt.{Color, Graphics2D, Image, RenderingHints, Toolkit}
import javax.imageio.ImageIO
import java.io.File
import java.awt.image.BufferedImage

def getPieceImage(pieceName: String, isWhite: Boolean): Image = {
  val colorString = if (isWhite) "white" else "black"
  val img = ImageIO.read(new File(s"src/main/scala/pieces/$colorString/$pieceName.png"))
  val resizedImg = img.getScaledInstance(64, 64, Image.SCALE_SMOOTH)
  val bImg = new BufferedImage(64, 64, BufferedImage.TYPE_INT_ARGB)
  val g2d = bImg.createGraphics()
  g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON)
  g2d.drawImage(resizedImg, 0, 0, null)
  g2d.dispose()
  Toolkit.getDefaultToolkit().createImage(bImg.getSource())
}
def drawChessBoardWithPieces(board: Array[Array[(Colors,Pieces)]]): Unit = {
  val darkSquare = new Color(209, 139, 71)
  val lightSquare = new Color(255, 206, 158)

  val letters = Array("a", "b", "c", "d", "e", "f", "g", "h")
  val numbers = Array("1", "2", "3", "4", "5", "6", "7", "8")
  val pieces = Map(
    'R' -> "rook",
    'N' -> "knight",
    'B' -> "bishop",
    'Q' -> "queen",
    'K' -> "king",
    'P' -> "pawn"
  )

  val boardGUI = new GridPanel(8, 8) {
    preferredSize = new Dimension(640, 640)
    override def paintComponent(g: Graphics2D) = {
      super.paintComponent(g)
      val pieceSize = 64
      for (i <- 0 until 8) {
        for (j <- 0 until 8) {
          val squareColor = if ((i + j) % 2 == 0) lightSquare else darkSquare
          g.setColor(squareColor)
          g.fillRect(j * pieceSize, i * pieceSize, pieceSize, pieceSize)
          for(i<-0 to 7){
            for(j<-0 to 7){
              if(board(i)(j)(0)!=Colors.Empty){
                g.drawImage(getPath(i, j, board), j * pieceSize, i * pieceSize, pieceSize, pieceSize, null)
              }
            }
          }
        }
      }
    }
  }


  val frame = new MainFrame {
    title = "Chess Board"
    contents = boardGUI
    pack()
    centerOnScreen()
    open()
    repaint()
  }
}
def getPath(i: Int, j: Int, board: Array[Array[(Colors,Pieces)]]):Image = board(i)(j) match{
  case (Colors.White, Pieces.Rook) => getPieceImage("rook",true)
  case (Colors.White, Pieces.Knight) => getPieceImage("knight",true)
  case (Colors.White, Pieces.Bishop) => getPieceImage("bishop",true)
  case (Colors.White, Pieces.Queen) => getPieceImage("queen",true)
  case (Colors.White, Pieces.King) => getPieceImage("king",true)
  case (Colors.White, Pieces.pawn) => getPieceImage("pawn",true)
  case (Colors.Black, Pieces.Rook) => getPieceImage("rook",false)
  case (Colors.Black, Pieces.Knight) => getPieceImage("knight",false)
  case (Colors.Black, Pieces.Bishop) => getPieceImage("bishop",false)
  case (Colors.Black, Pieces.Queen) => getPieceImage("queen",false)
  case (Colors.Black, Pieces.King) => getPieceImage("king",false)
  case (Colors.Black, Pieces.pawn) => getPieceImage("pawn",false)
  case _ => null
}
def changeLettersToIndex =(move:String) => move.split(' ').map(arr => arr.map(c=>
  if(c.isLetter)c.toInt - 'a'.toInt else c.toInt -'0'.toInt))
