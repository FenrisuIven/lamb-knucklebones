import './style.css'
import { Board } from './entities/board/board.js'
import {TurnsController} from "./entities/turnsController/turnsController.js";

document.querySelector('#app').innerHTML = `<div id="test"></div>`;
const target = document.querySelector('#test');

const turnsController = new TurnsController();
console.log(turnsController)
target.appendChild(turnsController.opponent.node)
target.appendChild(turnsController.dice.node)
target.appendChild(turnsController.player.node)

// const boardPC = new Board({blockInput: true});
// const boardPlayer = new Board({dice: boardPC._dice, blockInput: false});
// console.log(boardPC);
// console.log(boardPlayer);

// document.querySelector('#test').appendChild(boardPC.node);
// document.querySelector('#test').appendChild(boardPC._dice.node);
// document.querySelector('#test').appendChild(boardPlayer.node);

// boardPC._dice.score = 6;