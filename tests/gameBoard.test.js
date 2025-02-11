import { GameBoard } from "../src/js/modules/gameBoard";


test('Are all the ships sunk', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)

  expect(gameBoard.allSunk()).toBe(false)
})

test('The board can receive an attack', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)
  gameBoard.receiveAttack(0, 1)

  expect(gameBoard.attackBoard[1][0]).toBe(true)
})

test('`receiveAttack` returns `false` when the coordinates are outside of the board', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)
  

  expect(gameBoard.receiveAttack(0, -1)).toBe(false)
  expect(gameBoard.receiveAttack(17, 0)).toBe(false)
})

test('Can we place a ship', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)
  const shipIndex = 0
  let [x, y] = [0, 1]
  
  expect(gameBoard.placeShipAt(x, y, true, shipIndex)).toBe(true) // success code
  
  expect(gameBoard.getShip(x, y)).not.toBe(null)
  expect(gameBoard.getShip(x + 1, y)).not.toBe(null)
  expect(gameBoard.getShip(x + 2, y)).toBe(null)
})

test('Can we place a ship out of bounds', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)
  const shipIndex = 0
  let [x, y] = [9, 1]
  
  expect(gameBoard.placeShipAt(x, y, true, shipIndex)).toBe(false) // success code
})

test('Can we place a ship vertically', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)
  const shipIndex = 0
  let [x, y] = [0, 1]
  
  expect(gameBoard.placeShipAt(x, y, false, shipIndex)).toBe(true) // success code
  
  expect(gameBoard.getShip(x, y)).toEqual({hits: 0, length: 2})
})

test('`placeShipAt` returns `false` when the coordinates are outside of the board', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)
  

  expect(gameBoard.placeShipAt(0, -1, true, 0)).toBe(false)
  expect(gameBoard.placeShipAt(17, 0, true, 0)).toBe(false)
})

test('Can we hit a ship we just placed', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)
  const shipIndex = 0
  let [x, y] = [0, 1]
  
  expect(gameBoard.placeShipAt(x, y, false, shipIndex)).toBe(true) // success code
  gameBoard.receiveAttack(x, y)
  expect(gameBoard.getShip(x, y).hits).toBe(1)
})