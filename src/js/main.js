'use-strict'

// CSS imports
import 'normalize.css'
import '../css/style.css'

// JS modules
import { GameLogic } from './modules/gameLogic'

// Actual code goes here
const game = new GameLogic()
game.players[0].gameBoard.generateRandomBoard()
game.render(document.querySelector('#battleship-board-1'), document.querySelector('#battleship-board-2'))
