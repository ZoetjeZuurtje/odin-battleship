'use-strict'

// CSS imports
import 'normalize.css'
import '../css/style.css'

// JS modules
import { GameBoard } from './modules/gameBoard'
import { Player } from './modules/player'

// Actual code goes here
const startShipSizes = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]
const firstBoardElement = document.querySelector('#battleship-board-1')
const secondBoardElement = document.querySelector('#battleship-board-2')

const firstGameBoard = new GameBoard(firstBoardElement, ...startShipSizes)
const secondGameBoard = new GameBoard(secondBoardElement, ...startShipSizes)

const playerOne = new Player('player 1', false, firstGameBoard)
const playerTwo = new Player('cpu 1', true, secondGameBoard)

firstGameBoard.render()
secondGameBoard.render()

firstBoardElement.addEventListener('click', (e) => { playerOne.handleAttack(e, playerTwo) })
secondBoardElement.addEventListener('click', (e) => { playerTwo.handleAttack(e, playerOne) })
