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
    const board = this.players[0].gameBoard
    const attackBoard = this.players[0].gameBoard.attackBoard.flat()
    console.log(board)
    for (let y = 0; y < board.shipBoard.length; y++) {
      for (let x = 0; x < board.shipBoard[y].length; x++) {
        const shipId = board.getShipId(x, y)
        if (shipId === null) {
          continue
        }

        const shipExtendsNorth = board.getShipId(x, y + 1) === shipId
        const shipExtendsSouth = board.getShipId(x, y - 1) === shipId
        const shipExtendsEast = board.getShipId(x + 1, y) === shipId
        const shipExtendsWest = board.getShipId(x - 1, y) === shipId
        this.board1.children[(y * 10) + x].classList.add('ship')

        let cssClass = ''
        if (shipExtendsEast && shipExtendsWest) {
          cssClass = 'horizontal-bridge'
        } else if (shipExtendsNorth && shipExtendsSouth) {
          cssClass = 'vertical-bridge'
        } else if (shipExtendsNorth) {
          cssClass = 'top-end'
        } else if (shipExtendsEast) {
          cssClass = 'left-end'
        } else if (shipExtendsSouth) {
          cssClass = 'bottom-end'
        } else if (shipExtendsWest) {
          cssClass = 'right-end'
        }
        this.board1.children[(y * 10) + x].classList.add(cssClass)
      }
    }
  }
}

export { GameLogic }
