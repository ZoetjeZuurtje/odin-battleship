class Player {
  constructor (name, isCPU, gameBoard) {
    this.gameBoard = gameBoard
    this.cpu = isCPU
    this.name = name
  }

  isHuman = () => !this.cpu

  calculateAttack (board) {
    let availableTile = false
    while (!availableTile) {
      const x = Math.floor(Math.random() * 10)
      const y = Math.floor(Math.random() * 10)
      if (!this.gameBoard.attackBoard[y][x]) {
        console.log(this.gameBoard.attackBoard[y][x])
        this.gameBoard.boardElement.children[(y * 10) + x].click()
        availableTile = true
      }
    }
  }

  win () {
    window.alert(this.name + ' Won!')
  }

  handleAttack (event, opponent) {
    // Check if the board can be attacked
    if (!event.target.parentElement.classList.contains('can-receive-attack')) return
    // Send the attack and re-render the board
    const x = event.target.dataset.x
    const y = event.target.dataset.y
    const result = this.gameBoard.receiveAttack(x, y)

    // If the attack failed, for example after hitting a tile that has already been hit
    if (!result) return
    this.gameBoard.render()
    // If all the ships are sunk, you lose
    if (this.gameBoard.allSunk()) {
      opponent.win()
    }

    // toggle classes
    this.gameBoard.boardElement.classList.toggle('can-receive-attack')
    opponent.gameBoard.boardElement.classList.toggle('can-receive-attack')

    // Randomly shoot back if the player is a cpu
    if (!this.isHuman()) {
      opponent.calculateAttack(this.gameBoard.attackBoard)
    }
    return true
  }
}

export { Player }
