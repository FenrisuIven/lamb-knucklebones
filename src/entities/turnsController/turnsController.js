import { Board } from "../board/board.js";
import { Dice } from "../dice/dice.js";

export class TurnsController {
    idx = 0;
    player  = null;
    opponent = null;
    dice = null;
    constructor() {
        this.initPlayers();
        this.addEventListeners();
    }
    initPlayers() {
        const firstMove = Math.floor(Math.random() * 10)
        console.log(firstMove)
        
        this.dice = new Dice(`dice controller-${this.idx}`)
        this.player = new Board({
            dice: this.dice, 
            blockInput: firstMove % 2 === 0
        });
        this.opponent = new Board({
            dice: this.dice,
            blockInput: firstMove % 2 !== 0
        });
    }
    addEventListeners() {
        this.opponent.node.addEventListener('click', () => this.opponentMoved())
        this.player.node.addEventListener('click', () => this.playerMoved())
    }
    playerMoved() {
        this.player._blockInput = true;
        this.opponent._blockInput = false;
    }
    opponentMoved() {
        this.player._blockInput = false;
        this.opponent._blockInput = true;
    }
}