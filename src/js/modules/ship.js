class Ship {
  constructor (size) {
    if (typeof size !== 'number' || size < 1 || size > 6) {
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
