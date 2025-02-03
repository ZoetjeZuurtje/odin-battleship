class GameBoard {
  constructor (ships) {
    this.ships = ships
    this.board = new Array(10)
      .fill(null)
      .map(new Array(10))
      .fill(null)
  }

  receiveAttack () {

  }

  placeShipAt () {

  }

  allSunk () {

  }
}

export { GameBoard }