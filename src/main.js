import './style.css'
import { Board } from './entities/board/board.js'

document.querySelector('#app').innerHTML = `<div id="test"></div>`;

const board = new Board();
console.log(board);

document.querySelector('#test').appendChild(board.node);
document.querySelector('#test').appendChild(board._dice.node);

board._dice.score = 6;