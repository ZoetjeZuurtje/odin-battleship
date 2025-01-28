import { Ship } from './ship'

test('Checks if the ship isn\'t sunk to begin with', () => {
  const destroyer = new Ship(3)

  expect(destroyer.isSunk()).toBe(false)
})

test('Hits a ship once to damage it', () => {
  const destroyer = new Ship(3)
  destroyer.hit()

  expect(destroyer.isSunk()).toBe(false)
})

test('Hits a destroyer 3 times to sink it.', () => {
  const destroyer = new Ship(3)
  destroyer.hit()
  destroyer.hit()
  destroyer.hit()
  expect(destroyer.isSunk()).toBe(true)
})

test('Should throw an error if argument is not a positive number', () => {
  expect(() => { new Ship(-3) }).toThrow('Invalid Size Error')
  expect(() => { new Ship('yaya') }).toThrow('Invalid Size Error')
  expect(() => { new Ship() }).toThrow('Invalid Size Error')
})
