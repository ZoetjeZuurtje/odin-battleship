'use-strict'

// CSS imports
import 'normalize.css'
import '../css/style.css'

// JS modules
import { GameLogic } from './modules/gameLogic'

// Actual code goes here
const gameBoards = [document.querySelector('#battleship-board-1'), document.querySelector('#battleship-board-2')]
const game = new GameLogic(...gameBoards)
game.render()

gameBoards.forEach(board => {
  board.addEventListener('click', (event) => {
    if (!event.target.parentElement.classList.contains('can-receive-attack')) return // Return if the player clicked on the wrong board.
    const x = event.target.dataset.x
    const y = event.target.dataset.y
    game.attackField(x, y)
  })
})
