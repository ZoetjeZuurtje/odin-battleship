import { Player } from './player'

class GameLogic {
  constructor (options = {}) {
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

  render (firstBoardElement, secondBoardElement) {
    const firstBoard = this.players[0].gameBoard.renderBoard()
    const secondBoard = this.players[1].gameBoard.renderBoard()

    firstBoardElement.replaceChildren(firstBoard)
    secondBoardElement.replaceChildren(secondBoard)
  }
}

export { GameLogic }
