import Ship from './ship'



test('Is the ship sunk?', () => {
  const ship = new Ship(3)

  expect(ship.hits).toBe(0)
})
