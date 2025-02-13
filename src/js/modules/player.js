import { GameBoard } from './gameBoard'

class Player {
  constructor (name, isCPU) {
    const startShips = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
    this.gameBoard = new GameBoard(...startShips)
    this.cpu = isCPU
    this.name = name
  }

  isHuman = () => !this.cpu
}

export { Player }
