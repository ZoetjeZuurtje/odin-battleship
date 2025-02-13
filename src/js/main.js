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

firstBoardElement.replaceChildren(firstGameBoard.renderBoard())
secondBoardElement.replaceChildren(secondGameBoard.renderBoard())


firstBoardElement.addEventListener('click', (event) => {
  // Don't attack if it's not the player's turn
  if (!event.target.parentElement.classList.contains('can-receive-attack')) return
  
  // Send the attack and re-render the board
  const x = event.target.dataset.x
  const y = event.target.dataset.y
  firstGameBoard.receiveAttack(x, y)
  firstBoardElement.replaceChildren(firstGameBoard.renderBoard())
  // If all the ships are sunk, you win
  if (firstGameBoard.allSunk()) {
    playerTwo.win()
  }

  // toggle classes
  firstBoardElement.classList.toggle('can-receive-attack')
  secondBoardElement.classList.toggle('can-receive-attack')

  // Randomly shoot back if the player is a cpu
  if (!playerOne.isHuman()) {
    const {x, y} = playerOne.calculateAttack()
    secondGameBoard.receiveAttack(x, y)
  }
})
secondBoardElement.addEventListener('click', (event) => {
  // Don't attack if it's not the player's turn
  if (!event.target.parentElement.classList.contains('can-receive-attack')) return
  
  // Send the attack and re-render the board
  const x = event.target.dataset.x
  const y = event.target.dataset.y
  secondGameBoard.receiveAttack(x, y)
  secondBoardElement.replaceChildren(secondGameBoard.renderBoard())
  // If all the ships are sunk, you win
  if (secondGameBoard.allSunk()) {
    playerOne.win()
  }

  // Toggle classes to apply CSS
  firstBoardElement.classList.toggle('can-receive-attack')
  secondBoardElement.classList.toggle('can-receive-attack')

  // Randomly shoot back if the player is a cpu
  if (!playerTwo.isHuman()) {
    const {x, y} = playerTwo.calculateAttack()
    firstBoardElement.receiveAttack(x, y)
  }
})