import { Player } from "../src/player";

test('CPU is disabled by default' , () => {
  const player = new Player()
  
  expect(player.isHuman()).toBe(true)
})
test('CPU is enabled' , () => {
  const player = new Player({cpu: true})
  
  expect(player.isHuman()).toBe(false)
})