import './classes/boardCell/boardCell.css'
import './style.css'
import {
    BoardCell
} from './classes/boardCell/boardCell.js'

document.querySelector('#app').innerHTML = `
  <div id="test">
  </div>`;

const bc = new BoardCell(0);
console.log(bc);

BoardCell.insertCellInto(document.querySelector('#test'), bc);