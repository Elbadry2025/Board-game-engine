//package Checkers
import Chess.Colors.{Colors, Value}
import Chess.Pieces.{Pieces, Value}
import Sudoku.GameEngine.*

import javax.swing.{ImageIcon, JFrame, SwingUtilities}
//import scala.swing.{Component, MainFrame, SimpleSwingApplication}
import scala.swing._
import scala.util.control.Breaks.break
import scala.swing.event.ButtonClicked
//import Connect4._
//import Sudoku._
import Chess._
import Checkers._
import Tic_Tac_Toe._
import Queens._

@main
def main(): Unit = {
createMainMenu()
}



def createMainMenu(): Unit = {
  val gameOptions: List[String] = List(
    "Chess",
    "Checkers",
    "8 Queens",
    "sudoku",
    "tic_tac_toe",
    "connect 4"
  )

  val gameList: ListView[String] = new ListView(gameOptions)

  val startButton: Button = new Button("Start Game")

  val mainFrame: MainFrame = new MainFrame {
    title = "Game Selection Menu"
    preferredSize = new Dimension(300, 200)
    contents = new BoxPanel(Orientation.Vertical) {
      contents += new Label("Select a game:")
      contents += gameList
      contents += startButton
      border = Swing.EmptyBorder(20, 20, 20, 20)
    }
  }

  mainFrame.listenTo(startButton)  // Register event listener
  mainFrame.reactions += {
    case ButtonClicked(`startButton`) =>
      val selectedGame: Option[String] = gameList.selection.items.headOption
      selectedGame.foreach(startGame)
  }

  def startGame(game: String): Unit = {
    println(game)
    game match
      case "Checkers" => abstractEngine[String](2, checkersController, drawGUICheckers, initializeCheckersBoard)
      case "Tic_Tac_Toe" => abstractEngine[Char](2, TicTacToeController, TicTacToeDrawer, initializeTicTacToeBoard)
      case "8 Queens" => abstractEngine[Char](1, EQueensController, drawGUIEQueen, initializeEQueenBoard)
//      case "sudoku" => abstractEngine[Int](1, Sudokucontroller, drawBoardGUI_Sudoku, fillRandom)
//      case "connect 4" => abstractEngine(2,)
//      case "chess" => abstractEngine[(Colors,Pieces)](2, chessDrawer,chessController)

  }

  SwingUtilities.invokeLater(() => {
    mainFrame.visible = true
  })
}

def abstractEngine[T](numOfPlayers: Int,
                   controller: (String, (Array[Array[T]], Int)) => (Boolean, Array[Array[T]]),
                   drawer: Array[Array[T]] => Unit,
                   initBoard: () => Array[Array[T]]) =
{
  var state = (initBoard(), 0);
  drawer(state(0))

  while(true) {
    val input = scala.io.StdIn.readLine()
    val currentState: (Boolean, Array[Array[T]]) = controller(input, state)
    if(currentState(0) == true) {
      state = (currentState(1), (state(1)+1) % numOfPlayers)
      drawer(state(0))
    } else
      println("Invalid move!")
  }
}

///////////////////////////////////////

























/////////////////////////////



//  abstractEngine(8, 8, 2, "chess",chessDrawer,chessController)
//def abstractEngine(dimx: Int, dimy: Int, numOfPlayers: Int, game: String,
//                   controller: ((String,(Array[Array[Any]], Int)))=> (Boolean, Array[Array[Any]]),
//                   drawer: Array[Array[Any]] => Unit) = {
//  var state = (initBoard(dimx, dimy),0)
//  chessDrawer(state(0))
//  drawChessBoardWithPieces(state(0))
//  while(true) {
//    var input = scala.io.StdIn.readLine()
//    var currentState: (Boolean, Array[Array[Any]]) = controller(input, state)
//    if(currentState(0) == true) {
//      state = (currentState(1), (state(1)+1) % numOfPlayers)
//      var playerTurn = state(1)
//      println(s"the player turn is $playerTurn")
//      chessDrawer(state(0))
//      drawChessBoardWithPieces(state(0))
//    } else
//      println("Invalid move!")
//  }
//}




























//  def abstractEngine(dimx: Int, dimy: Int, numOfPlayers: Int, game: String) =
//  {
//    val frame = new JFrame()
//    var state = (Array.ofDim[Int](dimx, dimy), 0);
//    game match
//      case "connect4" =>
//        Connect4_drawer(state(0))
//        drawBoardGUI_Connect4(state(0), frame)
//      case "sudoku" =>
//        Sudokudrawer(state(0))
//        drawBoardGUI_Sudoku(state(0),frame)
//
//
//    while(true) {
//      val input = scala.io.StdIn.readLine()
//      var currentState: (Boolean, Array[Array[Int]]) = null
//      game match
//        case "connect4" =>
//          currentState = Connect4_controller(game, input, state)
//        case "sudoku" =>
//          currentState = Sudokucontroller(game, input, state)
//
//      if(currentState(0) == true) {
//        state = (currentState(1), (state(1)+1) % numOfPlayers)
//        game match
//          case "connect4" =>
//            Connect4_drawer(state(0))
//            drawBoardGUI_Connect4(state(0), frame)
//          case "sudoku" =>
//            Sudokudrawer(state(0))
//            drawBoardGUI_Sudoku(state(0), frame)
//      } else
//        println("Invalid move!")
//    }
//  }









