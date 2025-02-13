import { GameBoard } from './gameBoard'

class Player {
  constructor (name, isCPU) {
    const startShips = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
    this.gameBoard = new GameBoard(...startShips)
    this.cpu = isCPU
    this.name = name
  }

  isHuman = () => !this.cpu

  calculateAttack () {
    const x = Math.floor(Math.random() * 10)
    const y = Math.floor(Math.random() * 10)
    return {x, y}
  }
}

export { Player }
