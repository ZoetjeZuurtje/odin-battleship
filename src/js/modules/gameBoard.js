import { Ship } from './ship'

class GameBoard {
  constructor (boardElement, ...shipSizes) {
    this.boardSize = 10
    this.ships = shipSizes.map(size => new Ship(size))
    this.attackBoard = new Array(this.boardSize)
    this.shipBoard = new Array(this.boardSize)
    this.generateRandomBoard()
  }

  clear () {
    for (let i = 0; i < this.attackBoard.length; i++) {
      this.attackBoard[i] = new Array(this.boardSize).fill(false)
      this.shipBoard[i] = new Array(this.boardSize).fill(false)
    }
  }

  generateRandomBoard () {
    this.clear()
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
    if (!this.isOnBoard(x, y)) return null
    return this.shipBoard[y][x] === false ? null : this.ships[this.shipBoard[y][x]]
  }

  getShipId (x, y) {
    if (!this.isOnBoard(x, y)) return null
    return this.shipBoard[y][x] === false ? null : this.shipBoard[y][x]
  }

  // Return true on success, false on failure
  receiveAttack (x, y) {
    if (!this.isOnBoard(x, y)) return false // invalid square
    if (this.attackBoard[y][x]) return false // square has already been shot at

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

  // Returns a documentFragment representing the current state of the board
  renderBoard () {
    const fragment = new DocumentFragment()

    for (let y = 0; y < this.shipBoard.length; y++) {
      for (let x = 0; x < this.shipBoard[y].length; x++) {
        const tile = document.createElement('div')
        tile.dataset.x = x
        tile.dataset.y = y
        // Here we quickly check if the tile has already been hit
        if (this.attackBoard[y][x]) {
          tile.classList.add('shot')
        }
        // Everything here concerns the ships
        const shipId = this.getShipId(x, y)
        if (shipId === null) {
          fragment.append(tile)
          continue
        }
        const shipExtendsNorth = this.getShipId(x, y + 1) === shipId
        const shipExtendsSouth = this.getShipId(x, y - 1) === shipId
        const shipExtendsEast = this.getShipId(x + 1, y) === shipId
        const shipExtendsWest = this.getShipId(x - 1, y) === shipId

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

        // Here we apply the style
        tile.classList.add('ship', cssClass)
        fragment.append(tile)
      }
    }
    return fragment
  }
}

export { GameBoard }
