package Connect4

import java.awt.{Color, Graphics}
import javax.swing.{JFrame, JPanel}


def fill(): Array[Array[Int]] = {
  val board = Array.fill(6,7)(0);
  board
}
def Connect4_drawer(state: Array[Array[Int]]): Unit = {
  println("1 2 3 4 5 6 7")
  state.map(row => {
    row.map {
      case 0 => " "
      case 1 => "R"
      case 2 => "Y"
    }.mkString("|")
  }).foreach(println)
  println()
}
def changeLettersToIndex =(move:String) => move.split(' ').map(arr => arr.map(c=>
  if(c.isLetter)c.toInt - 'a'.toInt else c.toInt -'0'.toInt))


def Connect4_controller(move: String, state: (Array[Array[Int]], Int)): (Boolean, Array[Array[Int]]) = {

  def updateState(player: Int, col: Int, state: Array[Array[Int]]): Option[(Array[Array[Int]], (Int, Int))] = {
    (5 to 0 by -1).find(row => state(row)(col) == 0).map { row =>
      (state.updated(row, state(row).updated(col, player)), (row, col))
    }
  }

  val player = state._2 % 2 + 1
  val col = changeLettersToIndex(move)(0)(0)
  //val col =  move.toInt - 'a'.toInt
  if (col < 0 || col > 6 || state._1(0)(col) != 0) {
    (false, state._1)
  } else {
    updateState(player, col, state._1) match {
      case Some((newState, (row, col))) => (true, newState)
      case None => (false, state._1)
    }
  }

}


def drawBoardGUI_Connect4(state: Array[Array[Int]]): Unit = {
  val frame = new JFrame
  println("from the drawer of connect 4")
  val panel = new JPanel() {
    override def paintComponent(g: Graphics): Unit = {
      super.paintComponent(g)
      g.setColor(Color.BLUE)
      g.fillRect(0, 0, getWidth, getHeight)

      def drawCircle(x: Int, y: Int, color: Color): Unit = {
        g.setColor(color)
        g.fillOval(x + 15, y + 15, getWidth / 7 - 30, getHeight / 6 - 30)
      }

      for {
        row <- state.indices
        col <- state(row).indices
      } {
        val x = col * getWidth / 7
        val y = row * getHeight / 6
        g.setColor(Color.WHITE)
        g.fillOval(x + 10, y + 10, getWidth / 7 - 20, getHeight / 6 - 20)
        state(row)(col) match {
          case 1 => drawCircle(x, y, Color.RED)
          case 2 => drawCircle(x, y, Color.YELLOW)
          case _ =>
        }
      }
    }
  }

  frame.add(panel)
  frame.setSize(700, 600)
  frame.setVisible(true)
}
