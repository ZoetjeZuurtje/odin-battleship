class Ship {
  constructor (size) {
    this.length = size
    this.hits = 0
  }

  isSunk () {
    return this.hits >= this.length
  }

  hit () {
    this.hits++
  }
}

export default Ship
