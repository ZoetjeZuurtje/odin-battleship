import { Player } from './player'

class GameLogic {
  constructor (board1, board2, options = {}) {
    this.board1 = board1
    this.board2 = board2
    this.isCpuEnabled = options?.cpu ?? false

    this.players = [new Player(), new Player({ cpu: this.isCpuEnabled })]

    this.turn = false
  }

  // this.players[+this.turn] and
  // this.players[+!this.turn]
  // can be used to grab the attacking and defending player respectively
  //
  // The reasons this works is because the array of players always has a length of 2, and the + operator converts `false` and `true` to 0 and 1 respectively
  // this.turn must be up-to-date to ensure accuracy
  getAttackingPlayer = () => this.players[+this.turn]
  getDefendingPlayer = () => this.players[+!this.turn]

  endTurn () {
    this.turn = !this.turn
  }

  attackField (x, y) {
    const defendingPlayer = this.getDefendingPlayer()
    const isHit = defendingPlayer.gameBoard.receiveAttack(x, y) // Make the attack

    if (!isHit) { // If the attack misses, end the turn
      this.endTurn()
    }
  }

  render () {
    const shipBoard = this.players[0].gameBoard.shipBoard
    const attackBoard = this.players[0].gameBoard.attackBoard.flat()
    console.log(shipBoard);
    for (let y = 0; y < shipBoard.length; y++) {
      for (let x = 0; x < shipBoard[y].length; x++) {
        const tile = shipBoard[y][x]
        if (tile != false) {
          this.board1.children[(y * 10) + x].classList.add('ship')
        }
        if (shipBoard.at(y).at(x - 1) === tile && tile === shipBoard.at(y).at(x + 1)) {
          this.board1.children[(y * 10) + x].classList.add('horizontal-bridge')
        }
        if (shipBoard.at(y - 1).at(x) === tile && tile === shipBoard.at(y + 1).at(x)) {
          this.board1.children[(y * 10) + x].classList.add('vertical-bridge')
        }
        if (shipBoard.at(y).at(x - 1) === tile && shipBoard.at(y).at(x + 1) !== tile) {
          this.board1.children[(y * 10) + x].classList.add('right-end')
        }
        if (shipBoard.at(y).at(x - 1) !== tile && shipBoard.at(y).at(x + 1) === tile) {
          this.board1.children[(y * 10) + x].classList.add('left-end')
        }
        if (shipBoard.at(y - 1).at(x) === false && shipBoard.at(y + 1).at(x) !== false) {
          this.board1.children[(y * 10) + x].classList.add('top-end')
        }
        if (shipBoard.at(y - 1).at(x) !== false && shipBoard.at(y + 1).at(x) === false) {
          this.board1.children[(y * 10) + x].classList.add('bottom-end')
        }
      } 
    }
  }
}

export { GameLogic }
