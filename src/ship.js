class Ship {
  constructor (size) {
    if (typeof size !== 'number' || size < 1) {
      throw new Error('Invalid Size Error')
    }

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

export { Ship }
