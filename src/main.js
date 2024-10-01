import './style.css'
import { BoardCell } from './entities/boardCell/boardCell.js'
import { Board } from './entities/board/board.js'

document.querySelector('#app').innerHTML = `<div id="test"></div>`;

const b = new Board();
console.log(b);

document.querySelector('#test').appendChild(b.node);