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
      const setHorizontal = Math.random() > 0.5
      const result = this.placeShipAt(x, y, setHorizontal, shipsPlaced)

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

  placeShipAt (x, y, isHorizontal, shipIndex) {
    let length = this.ships[shipIndex].length

    // Check if the ship fits on the board. If not, return false
    const fitsOnBoard = this.isOnBoard(x, y) && ((isHorizontal && this.isOnBoard(x + length, y)) || (!isHorizontal && this.isOnBoard(x, y + length)))
    if (!fitsOnBoard) return false

    const coordsToSet = []
    while (length > 0) {
      // Get new tile on the board...
      length--
      const currentX = isHorizontal ? x + length : x
      const currentY = !isHorizontal ? y + length : y
      // ... and check if it is already occupied
      const coordinateIsOccupied = this.shipBoard[currentY][currentX] !== false
      if (coordinateIsOccupied) return false

      coordsToSet.push({ x: currentX, y: currentY }) // Otherwise, record the location and continue the loop
    }

    // actually set the ships
    for (const coord of coordsToSet) {
      this.shipBoard[coord.y][coord.x] = shipIndex
    }

    return true
  }
}

export { GameBoard }
