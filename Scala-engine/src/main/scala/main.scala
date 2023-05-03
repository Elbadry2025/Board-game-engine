@main
def main(): Unit = {
  println("Hello world!")
  abstractEngine(8, 8, 2, "chess")
}

def drawer(drawer: Unit): Unit = {
  println("drawer")
}

def controller(game: String, move: String, state: (Array[Array[Int]], Int)): (Boolean, Array[Array[Int]]) = {
  // change letters to digits
  val indexedMove = move.split(' ').map(arr => arr.map(c => if(c.isLetter) c.toInt - 'a'.toInt else c))
  println(indexedMove)
  game match
    case "chess" => println("chess controller called")
    case _ => println("not a valid game")

  (true, Array.ofDim(8, 8))
}

def abstractEngine(dimx: Int, dimy: Int, numOfPlayers: Int, game: String) =
{
  var state = (Array.ofDim[Int](dimx, dimy), 0);
  while(true) {
    val input = scala.io.StdIn.readLine()
    val currentState: (Boolean, Array[Array[Int]]) = controller(game, input, state)
    if(currentState(0) == true) {
      state = (currentState(1), (state(1)+1) % numOfPlayers)
      drawer(state(1))
    } else
      println("Invalid move!")
  }
}

// controller : (String, (Array[Array[Int]], Int)) => (Boolean, Array[Array[Int]]),
//                   drawer: Unit => Unit