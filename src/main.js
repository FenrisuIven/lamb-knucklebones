import './style.css'
import { TurnsController } from "./entities/turnsController/turnsController.js";

document.querySelector('#app').innerHTML = `<div id="test"></div>`;
const target = document.querySelector('#test');

const turnsController = new TurnsController();
//console.log(turnsController)
target.appendChild(turnsController.players.opponentNode)
target.appendChild(turnsController.dice.node)
target.appendChild(turnsController.players.playerNode)
