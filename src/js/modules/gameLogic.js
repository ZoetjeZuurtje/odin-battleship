import { Player } from './player'

class GameLogic {
  constructor (firstBoard, secondBoard, options = {}) {
    this.firstBoardElement = firstBoard
    this.secondBoardElement = secondBoard
    this.isCpuEnabled = options?.cpu ?? false

    this.players = [new Player('Player 1'), new Player('Player 2', this.isCpuEnabled)]

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
    const isHit =  defendingPlayer.gameBoard.receiveAttack(x, y) // Make the attack
    if (isHit) {
      this.endTurn()
      this.render()
    }
    if (defendingPlayer.gameBoard.allSunk()) {
      window.alert(`${this.getDefendingPlayer().name} Wins!`)
    }
    if (!this.getAttackingPlayer().isHuman()) {
      const {x, y} = this.getAttackingPlayer().calculateAttack()
      console.log(x, y)
      this.attackField(x, y)
    }
  }

  render () {
    const firstBoard = this.players[0].gameBoard.renderBoard()
    const secondBoard = this.players[1].gameBoard.renderBoard()

    this.firstBoardElement.replaceChildren(firstBoard)
    this.secondBoardElement.replaceChildren(secondBoard)

    this.firstBoardElement.classList.toggle('can-receive-attack')
    this.secondBoardElement.classList.toggle('can-receive-attack')
  }
}

export { GameLogic }
