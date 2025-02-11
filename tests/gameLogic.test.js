import { GameLogic } from '../src/js/modules/gameLogic'


test('EndTurn() works', () => {
  const game = new GameLogic()

  expect(game.turn).toBe(false)
  game.endTurn()
  expect(game.turn).toBe(true)
})