import { Ship } from './ship'

class GameBoard {
  constructor (...shipSizes) {
    const boardSize = 10
    this.ships = shipSizes.map(size => new Ship(size))
    this.attackBoard = new Array(boardSize)
    this.shipBoard = new Array(boardSize)

    for (let i = 0; i < this.attackBoard.length; i++) {
      this.attackBoard[i] = new Array(boardSize).fill(false)
      this.shipBoard[i] = new Array(boardSize).fill(false)
    }
  }

  allSunk = () => this.ships.every(ship => ship.isSunk())

  isOnBoard (x, y) {
    const isXOnBoard = x >= 0 && x < this.attackBoard.length
    const isYOnBoard = y >= 0 && y < this.attackBoard.length
    return isXOnBoard && isYOnBoard
  }

  // returns the ship on (x, y), or null otherwise
  getShip (x, y) {
    return this.shipBoard[y][x] === false ? null : this.shipBoard[y][x]
  }

  // Return true on success, false on failure
  receiveAttack (x, y) {
    if (!this.isOnBoard(x, y)) return false // invalid square
    if (this.attackBoard[x][y]) return false // square has already been shot at

    this.attackBoard[y][x] = true
    this.getShip(x, y)?.hit()

    return true
  }

  placeShipAt (x, y, direction, shipIndex) {
    let length = this.ships[shipIndex].length - 1
    if (!this.isOnBoard(x, y)) return false
    if (direction === 'horizontal' && !this.isOnBoard(x + length, y)) return false
    if (direction === 'vertical' && !this.isOnBoard(x, y + length)) return false


    if (direction === 'vertical') {
      do {
        this.shipBoard[y + length][x] = shipIndex
        length--
      } while (length >= 0)
    } else if (direction === 'horizontal') {
      do {
        this.shipBoard[y][x + length] = shipIndex
        length--
      } while (length >= 0)
    }

    return true
  }
}

export { GameBoard }
