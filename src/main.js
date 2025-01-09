import './style.css'
import { TurnsController } from "./entities/turnsController/turnsController.js";

document.querySelector('#app').innerHTML = `<div id="boards-container"></div>`;
const target = document.querySelector('#boards-container');

const turnsController = new TurnsController();
//console.log(turnsController)
target.appendChild(turnsController.entities.opponentNode)
target.appendChild(turnsController.dice.node)
target.appendChild(turnsController.entities.playerNode)

