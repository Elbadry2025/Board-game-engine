package Sudoku
import java.awt.{BasicStroke, BorderLayout, Color, Font, Graphics, Graphics2D, RenderingHints}
import javax.swing.{JFrame, JPanel}
import scala.util.Random
import scala.collection.mutable.Set
import scala.swing.{Dimension, GridPanel, Label}
import javax.swing.SwingUtilities
object GameEngine {

  def isValidMoveSudoku(board: Array[Array[(Int,Boolean)]], row: Int, col: Int, num: Int): Boolean = {
    val boxRow = 3 * (row / 3)
    val boxCol = 3 * (col / 3)
    row >= 0 && row < 9 && col >= 0 && col < 9 && board(row)(col)._2 &&num >= 1 && num <= 9 && !(0 until 9).exists { i =>
      board(row)(i)._1 == num ||
        board(i)(col)._1 == num ||
        board(boxRow + (i % 3))(boxCol + (i / 3))._1 == num
    }
  }


  def fillRandom(): Array[Array[(Int,Boolean)]] = {

    val a: Array[Array[(Int,Boolean)]] = Array.fill(9, 9)(0,false)
    val r = Array.fill(9)(Set[Int]())
    val c = Array.fill(9)(Set[Int]())
    val z = Array.fill(3, 3)(Set[Int]())

    for (x <- 0 to 8; y <- 0 to 8)
      if (a(x)(y)._1 != 0)
        setExist(a(x)(y)._1, x, y)

    def setExist(v: Int, x: Int, y: Int) = {
      r(x) += v
      c(y) += v
      z(x / 3)(y / 3) += v
    }
    def remove(a: Array[Array[(Int,Boolean)]], count: Int): Array[Array[(Int,Boolean)]] = {
      val rs = Random.shuffle(List.range(0, 81))
      for (i <- 0 until count)
        a(rs(i) / 9)(rs(i) % 9) = (0,true)
      a
    }
    def fill(x: Int, y: Int): Boolean = {
      if (a(x)(y)._1 == 0) {
        val candidates = Set() ++ (1 to 9) -- r(x) -- c(y) -- z(x / 3)(y / 3)

        def current(): Boolean = {
          if (candidates.isEmpty)
            false
          else {
            val v = Random.shuffle(candidates.toList).iterator.next
            candidates -= v
            a(x)(y) = (v,false)
            setExist(v, x, y)
            val good = if (y < 8) fill(x, y + 1) else if (x < 8) fill(x + 1, 0) else true
            if (good)
              true
            else {
              a(x)(y) = (0,false)
              r(x) -= v
              c(y) -= v
              z(x / 3)(y / 3) -= v
              current()
            }
          }
        }

        current()
      }
      else if (y < 8) fill(x, y + 1) else if (x < 8) fill(x + 1, 0) else true
    }

    fill(0, 0)
    remove(a, 60)

  }

  def Sudokucontroller(move: String, state: (Array[Array[(Int,Boolean)]], Int)): (Boolean, Array[Array[(Int,Boolean)]]) = {

    val col = move(0).toInt -'a'.toInt
    val row = 9-(move(1).toInt -'0'.toInt)
    val value = move(3).toInt -'0'.toInt
    println("row = " + row)
    println("col = "+ col)
    println(value)

    if (isValidMoveSudoku(state(0), row, col, value)) {
      //val newBoard = state._1.updated(row, state._1(row).updated(col, value))
      val newBoard = state._1.updated(row, state._1(row).updated(col, (value, true)))

      (true, newBoard)
    } else {
      (false, state._1)
    }
  }





  def Sudokudrawer(board: Array[Array[Int]]): Unit = {
    // Draw the Sudoku board
    println("   a  b  c d  e  f g  h  i ")
    println("  +-------+-------+-------+")
    (0 until 9).foreach { i =>
      if (i % 3 == 0) {
        println("  |       |       |       |")
      }
      print(9-i + " ")
      (0 until 9).foreach { j =>
        if (j % 3 == 0) {
          print("| ")
        }
        val cell = board(i)(j)
        val value = if (cell == 0) " " else cell.toString
        if ((i == 4) && (j == 4)) {
          print(value + " ")
        } else if (cell == 0) {
          print(value + " ")
        } else {
          print(value + " ")
        }
      }
      print("|")
      println()
    }

    println("  +-------+-------+-------+")
  }



  ///////////




  def drawBoardGUI_Sudoku(board: Array[Array[(Int,Boolean)]]): Unit = {
    //Sudokudrawer(board)
    val frame = new JFrame
    val panel = new JPanel() {
      override def paintComponent(g: Graphics): Unit = {
        super.paintComponent(g)
        val g2d = g.asInstanceOf[Graphics2D]
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON)
        g.setColor(Color.BLACK)

        // Draw grid lines
        (0 to 9).foreach { i =>
          val x = i * getWidth / 9
          val y = i * getHeight / 9
          if ((i) % 3 == 0) {
            g2d.setStroke(new BasicStroke(3f))
          } else {
            g2d.setStroke(new BasicStroke(1f))
          }
          g2d.drawLine(x, 0, x, getHeight)
          g2d.drawLine(0, y, getWidth, y)
        }

        // Draw numbers
        g.setColor(Color.BLUE)
        g.setFont(g.getFont.deriveFont(30f))
        board.indices.foreach { i =>
          board(i).indices.foreach { j =>
            val x = j * getWidth / 9 + getWidth / 20
            val y = i * getHeight / 9 + getHeight / 12
            val value = board(i)(j)._1
            if (value != 0) {
              g.drawString(value.toString, x, y)
            }
          }
        }
      }
    }

    frame.add(panel)
    frame.setSize(500, 500)
    frame.setVisible(true)
  }








  // Start the game




}

