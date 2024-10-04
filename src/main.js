import './style.css'
import { BoardCell } from './entities/boardCell/boardCell.js'
import { Board } from './entities/board/board.js'
import { Dice } from './entities/dice/dice.js'

document.querySelector('#app').innerHTML = `<div id="test"></div>`;

const board = new Board();
console.log(board);
const dice = new Dice();
console.log(dice)

document.querySelector('#test').appendChild(board.node);
document.querySelector('#test').appendChild(dice.node);

//board.updateScore();
dice.score = 4;