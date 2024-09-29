import './classes/boardCell/boardCell.css'
import './classes/board/board.css'
import './style.css'
import { BoardCell } from './classes/boardCell/boardCell.js'
import { Board } from './classes/board/board.js'

document.querySelector('#app').innerHTML = `<div id="test"></div>`;

//testing area
const b = new Board();
console.log(b);

document.querySelector('#test').appendChild(b.getNode());