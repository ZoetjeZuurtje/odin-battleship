import { GameBoard } from './gameBoard'

class Player {
  constructor (options = {}) {
    const startShips = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
    this.gameBoard = new GameBoard(...startShips)
    this._cpu = options?.cpu
  }

  isHuman = () => !this._cpu
}

export { Player }
