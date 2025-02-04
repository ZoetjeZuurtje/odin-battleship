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

  generateRandomBoard () {
    let shipsPlaced = 0
    while (shipsPlaced < this.ships.length) {
      const x = Math.floor(Math.random() * 10)
      const y = Math.floor(Math.random() * 10)
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical'
      const result = this.placeShipAt(x, y, direction, shipsPlaced)

      if (result) {
        shipsPlaced++
      }
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
    return this.shipBoard[y][x] === false ? null : this.ships[this.shipBoard[y][x]]
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

    let coordsToSet = []
    if (direction === 'vertical') {
      do {
        if (this.shipBoard[y + length][x] !== false) {
          return false
        }
        coordsToSet.push({x, y: y + length})
        length--
      } while (length >= 0)
    } else if (direction === 'horizontal') {
      do {
        if (this.shipBoard[y][x + length]) {
          return false
        }
        coordsToSet.push({x: x + length, y})
        length--
      } while (length >= 0)
    }

    // actually set the ships
    for (const coord of coordsToSet) {
      this.shipBoard[coord.y][coord.x] = shipIndex
    }

    return true
  }
}

export { GameBoard }
