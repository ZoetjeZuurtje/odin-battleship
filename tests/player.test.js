import { Player } from "../src/player";

test('Knows whether or not it is a CPU' , () => {
  const player = new Player()
  
  expect(player.isHuman()).toBe(true)
})
test('Knows whether or not it is a CPU' , () => {
  const player = new Player({cpu: true})
  
  expect(player.isHuman()).toBe(false)
})