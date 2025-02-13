class Player {
  constructor (name, isCPU, gameBoard) {
    
    this.gameBoard = gameBoard
    this.cpu = isCPU
    this.name = name
  }

  isHuman = () => !this.cpu

  calculateAttack () {
    const x = Math.floor(Math.random() * 10)
    const y = Math.floor(Math.random() * 10)
    return {x, y}
  }

  win () {
    window.alert(this.name + ' Won!')
  }
}

export { Player }
