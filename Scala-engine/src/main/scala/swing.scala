/*
import java.awt.Color
import java.awt.Dimension
import scala.swing._

object ChessBoard extends SimpleSwingApplication {
  def top = new MainFrame {
    title = "Chess Board"

    val darkSquare = new Color(209,139,71)
    val lightSquare = new Color(255,206,158)

    val letters = Array("a", "b", "c", "d", "e", "f", "g", "h")
    val numbers = Array("1", "2", "3", "4", "5", "6", "7", "8")
    val pieces = Array("R", "N", "B", "Q", "K", "B", "N", "R")

    val board = new GridPanel(8, 8) {
      preferredSize = new Dimension(640, 640)
      for (i <- 0 until 8) {
        for (j <- 0 until 8) {
          val squareColor = if ((i + j) % 2 == 0) lightSquare else darkSquare
          val button = new Button("") {
            preferredSize = new Dimension(80, 80)
            background = squareColor
            if (i == 0 || i == 7) {
              text = pieces(j)
              if (i == 0) foreground = Color.WHITE
              else foreground = Color.BLACK
            }
            if (i == 1 || i == 6) {
              text = "P"
              if (i == 1) foreground = Color.WHITE
              else foreground = Color.BLACK
            }
          }
          contents += button
        }
      }
    }

    contents = board
  }
}
*/