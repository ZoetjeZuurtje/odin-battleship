import { GameBoard } from "../src/gameBoard";


test('Are all the ships sunk', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)

  expect(gameBoard.allSunk()).toBe(false)
})

test('The board can receive an attack', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...shipSizes)
  gameBoard.receiveAttack(0, 1)

  expect(gameBoard.attackBoard[0, 1]).toBe(true)
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
  gameBoard.placeShipAt(0, 1, 'horizontal', shipIndex)

  expect(gameBoard.shipBoard[0, 1]).toBe(shipIndex)
  expect(gameBoard.shipBoard[1, 1]).toBe(shipIndex)
})

test('`placeShipAt` returns `false` when the coordinates are outside of the board', () => {
  const shipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
  const gameBoard = new GameBoard(...ships)
  

  expect(gameBoard.placeShipAt(0, -1)).toBe(false)
  expect(gameBoard.placeShipAt(17, 0)).toBe(false)
})