//import Chess._
import javax.swing.{ImageIcon, SwingUtilities}
//import scala.swing.{Component, MainFrame, SimpleSwingApplication}
import scala.swing._
import scala.util.control.Breaks.break
import scala.swing.event.ButtonClicked

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
    // TODO: Implement game launching logic based on the selected game
    println(s"Starting $game...")
  }

  SwingUtilities.invokeLater(() => {
    mainFrame.visible = true
  })
}




















//  abstractEngine(8, 8, 2, "chess",chessController,chessDrawer)
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
