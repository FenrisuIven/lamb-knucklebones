import { Board } from "../board/board.js";
import { Dice } from "../dice/dice.js";
import {createNode, fillNode} from "../../view/nodeGeneration/nodes.js";

export class TurnsController {
    idx = 0;
    player  = null;
    opponent = null;
    dice = null;
    playerNode = null;
    opponentNode = null;
    
    constructor() {
        this.initPlayers();
        this.addEventListeners();
    }
    initPlayers() {
        const firstMove = Math.floor(Math.random() * 10)        
        this.dice = new Dice(`dice controller-${this.idx}`)
        this.player = new Board({
            dice: this.dice, 
            blockInput: firstMove % 2 === 0
        });
        this.opponent = new Board({
            dice: this.dice,
            blockInput: firstMove % 2 !== 0
        });
        this.playerNode = this.initPlayerNode;
        this.opponentNode = this.initOpponentNode;
        console.log('first to move:', firstMove % 2 === 0 ? 'top' : 'bottom')
    }
    addEventListeners() {
        this.opponent.node.addEventListener('click', (event) => this.opponentMoved(event))
        this.player.node.addEventListener('click', (event) => this.playerMove(event))
    }
    playerMove(event) {
        if(this.player.handleInputAttempt(event)) {
            this.updateDisplayScore(this.playerNode, this.player._currentScore);
            if (!this.player.freeCells()) return this.endGame();
            this.opponent._blockInput = false;
            this.player._blockInput = true;
        }
    }
    opponentMoved(event) {
        if(this.opponent.handleInputAttempt(event)){
            this.updateDisplayScore(this.opponentNode, this.opponent._currentScore);
            if (!this.opponent.freeCells()) return this.endGame();
            this.player._blockInput = false;
            this.opponent._blockInput = true;
        }
    }
    
    updateDisplayScore(target, score) {
        const targetName = target.className.split('-')[0];
        if (!targetName) return;
        const span = createNode('span', {})
        span.textContent = `${targetName} score: ${score}`
        target.replaceChild(span, target.children[targetName === 'player' ? 1 : 0])
    }
    
    get initPlayerNode() {
        const span = createNode('span', {});
        span.textContent = 'player score: ';
        return createNode('div',
            {
                className: 'player-container',
                children: [ this.player.node, span ],
            })
    }
    get initOpponentNode() {
        const span = createNode('span', {});
        span.textContent = 'opponent score: ';
        return createNode('div', {
            className: 'opponent-container',
            children: [ span, this.opponent.node ]
        })
    }
    
    endGame() {
        const winnerName = this.player._currentScore > this.opponent._currentScore ? 'player' : 'opponent'
        console.log('Game ended! Winner is: ', winnerName)
        this.player._blockInput = true;
        this.player._blockInput = true;
    }
}