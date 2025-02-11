/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./node_modules/normalize.css/normalize.css?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://battleship/./src/css/style.css?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ \"./node_modules/normalize.css/normalize.css\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _modules_gameLogic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/gameLogic */ \"./src/js/modules/gameLogic.js\");\n'use-strict'\n\n// CSS imports\n;\n\n\n// JS modules\n\n\n// Actual code goes here\nconst game = new _modules_gameLogic__WEBPACK_IMPORTED_MODULE_2__.GameLogic(document.querySelector('#battleship-board-1'), document.querySelector('#battleship-board-2'))\ngame.players[0].gameBoard.generateRandomBoard();\ngame.render()\n\n\n//# sourceURL=webpack://battleship/./src/js/main.js?");

/***/ }),

/***/ "./src/js/modules/gameBoard.js":
/*!*************************************!*\
  !*** ./src/js/modules/gameBoard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameBoard: () => (/* binding */ GameBoard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/js/modules/ship.js\");\n\n\nclass GameBoard {\n  constructor (...shipSizes) {\n    const boardSize = 10\n    this.ships = shipSizes.map(size => new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(size))\n    this.attackBoard = new Array(boardSize)\n    this.shipBoard = new Array(boardSize)\n\n    for (let i = 0; i < this.attackBoard.length; i++) {\n      this.attackBoard[i] = new Array(boardSize).fill(false)\n      this.shipBoard[i] = new Array(boardSize).fill(false)\n    }\n  }\n\n  generateRandomBoard () {\n    let shipsPlaced = 0\n    while (shipsPlaced < this.ships.length) {\n      const x = Math.floor(Math.random() * 10)\n      const y = Math.floor(Math.random() * 10)\n      const setHorizontal = Math.random() > 0.5\n      const result = this.placeShipAt(x, y, setHorizontal, shipsPlaced)\n\n      if (result) {\n        shipsPlaced++\n      }\n    }\n  }\n\n  allSunk = () => this.ships.every(ship => ship.isSunk())\n\n  isOnBoard (x, y) {\n    const isXOnBoard = x >= 0 && x < this.attackBoard.length\n    const isYOnBoard = y >= 0 && y < this.attackBoard.length\n    return isXOnBoard && isYOnBoard\n  }\n\n  // returns the ship on (x, y), or null otherwise\n  getShip (x, y) {\n    return this.shipBoard[y][x] === false ? null : this.ships[this.shipBoard[y][x]]\n  }\n\n  // Return true on success, false on failure\n  receiveAttack (x, y) {\n    if (!this.isOnBoard(x, y)) return false // invalid square\n    if (this.attackBoard[x][y]) return false // square has already been shot at\n\n    this.attackBoard[y][x] = true\n    this.getShip(x, y)?.hit()\n\n    return true\n  }\n\n  placeShipAt (x, y, isHorizontal, shipIndex) {\n    let length = this.ships[shipIndex].length\n\n    // Check if the ship fits on the board. If not, return false\n    const fitsOnBoard = this.isOnBoard(x, y) && ((isHorizontal && this.isOnBoard(x + length, y)) || (!isHorizontal && this.isOnBoard(x, y + length)))\n    if (!fitsOnBoard) return false\n\n    const coordsToSet = []\n    while (length > 0) {\n      // Get new tile on the board...\n      length--\n      const currentX = isHorizontal ? x + length : x\n      const currentY = !isHorizontal ? y + length : y\n      // ... and check if it is already occupied\n      const coordinateIsOccupied = this.shipBoard[currentY][currentX] !== false\n      if (coordinateIsOccupied) return false\n\n      coordsToSet.push({ x: currentX, y: currentY }) // Otherwise, record the location and continue the loop\n    }\n\n    // actually set the ships\n    for (const coord of coordsToSet) {\n      this.shipBoard[coord.y][coord.x] = shipIndex\n    }\n\n    return true\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/js/modules/gameBoard.js?");

/***/ }),

/***/ "./src/js/modules/gameLogic.js":
/*!*************************************!*\
  !*** ./src/js/modules/gameLogic.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GameLogic: () => (/* binding */ GameLogic)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/js/modules/player.js\");\n\n\nclass GameLogic {\n  constructor (board1, board2, options = {}) {\n    this.board1 = board1\n    this.board2 = board2\n    this.isCpuEnabled = options?.cpu ?? false\n\n    this.players = [new _player__WEBPACK_IMPORTED_MODULE_0__.Player(), new _player__WEBPACK_IMPORTED_MODULE_0__.Player({ cpu: this.isCpuEnabled })]\n\n    this.turn = false\n  }\n\n  // this.players[+this.turn] and\n  // this.players[+!this.turn]\n  // can be used to grab the attacking and defending player respectively\n  //\n  // The reasons this works is because the array of players always has a length of 2, and the + operator converts `false` and `true` to 0 and 1 respectively\n  // this.turn must be up-to-date to ensure accuracy\n  getAttackingPlayer = () => this.players[+this.turn]\n  getDefendingPlayer = () => this.players[+!this.turn]\n\n  endTurn () {\n    this.turn = !this.turn\n  }\n\n  attackField (x, y) {\n    const defendingPlayer = this.getDefendingPlayer()\n    const isHit = defendingPlayer.gameBoard.receiveAttack(x, y) // Make the attack\n\n    if (!isHit) { // If the attack misses, end the turn\n      this.endTurn()\n    }\n  }\n\n  render () {\n    const shipBoard = this.players[0].gameBoard.shipBoard\n    const attackBoard = this.players[0].gameBoard.attackBoard.flat()\n    console.log(shipBoard);\n    for (let y = 0; y < shipBoard.length; y++) {\n      for (let x = 0; x < shipBoard[y].length; x++) {\n        const tile = shipBoard[y][x]\n        if (tile != false) {\n          this.board1.children[(y * 10) + x].classList.add('ship')\n        }\n        if (shipBoard.at(y).at(x - 1) === tile && tile === shipBoard.at(y).at(x + 1)) {\n          this.board1.children[(y * 10) + x].classList.add('horizontal-bridge')\n        }\n        if (shipBoard.at(y - 1).at(x) === tile && tile === shipBoard.at(y + 1).at(x)) {\n          this.board1.children[(y * 10) + x].classList.add('vertical-bridge')\n        }\n        if (shipBoard.at(y).at(x - 1) === tile && shipBoard.at(y).at(x + 1) !== tile) {\n          this.board1.children[(y * 10) + x].classList.add('right-end')\n        }\n        if (shipBoard.at(y).at(x - 1) !== tile && shipBoard.at(y).at(x + 1) === tile) {\n          this.board1.children[(y * 10) + x].classList.add('left-end')\n        }\n        if (shipBoard.at(y - 1).at(x) === false && shipBoard.at(y + 1).at(x) !== false) {\n          this.board1.children[(y * 10) + x].classList.add('top-end')\n        }\n        if (shipBoard.at(y - 1).at(x) !== false && shipBoard.at(y + 1).at(x) === false) {\n          this.board1.children[(y * 10) + x].classList.add('bottom-end')\n        }\n      } \n    }\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/js/modules/gameLogic.js?");

/***/ }),

/***/ "./src/js/modules/player.js":
/*!**********************************!*\
  !*** ./src/js/modules/player.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/js/modules/gameBoard.js\");\n\n\nclass Player {\n  constructor (options = {}) {\n    const startShips = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5]\n    this.gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__.GameBoard(...startShips)\n    this._cpu = options?.cpu\n  }\n\n  isHuman = () => !this._cpu\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/js/modules/player.js?");

/***/ }),

/***/ "./src/js/modules/ship.js":
/*!********************************!*\
  !*** ./src/js/modules/ship.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor (size) {\n    if (typeof size !== 'number' || size < 1 || size > 6) {\n      throw new Error('Invalid Size Error')\n    }\n\n    this.length = size\n    this.hits = 0\n  }\n\n  isSunk () {\n    return this.hits >= this.length\n  }\n\n  hit () {\n    this.hits++\n  }\n}\n\n\n\n\n//# sourceURL=webpack://battleship/./src/js/modules/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;