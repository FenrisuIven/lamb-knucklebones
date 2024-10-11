import { Board } from "../board/board.js";
import { Dice } from "../dice/dice.js";
import { createNode } from "../../view/nodeGeneration/nodes.js";

// looks as good as I can make it

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
            idx: this.idx,
            dice: this.dice, 
            blockInput: firstMove % 2 === 0
        });
        this.opponent = new Board({
            idx: this.idx,
            dice: this.dice,
            blockInput: firstMove % 2 !== 0
        });
        this.playerNode = this.initPlayerNode();
        this.opponentNode = this.initOpponentNode();
        console.log('first to move: ' + (firstMove % 2 === 0 ? 'opponent' : 'player'));
    }
    addEventListeners() {
        this.opponent.node.addEventListener('click', (event) => this.opponentMove(event))
        this.player.node.addEventListener('click', (event) => this.playerMove(event))
    }
    
    // this can definitely be refactored, idk how
    playerMove(event) {
        if(!this.player.handleInputAttempt(event)) return;
        
        this.updateDisplayScore(this.playerNode, this.player._currentScore);
        
        this.opponent._blockInput = false;
        this.player._blockInput = true;
        if (!this.player.freeCells()) return this.endGame();
    }
    opponentMove(event) {
        if(!this.opponent.handleInputAttempt(event)) return;
        
        this.updateDisplayScore(this.opponentNode, this.opponent._currentScore);
        
        this.player._blockInput = false;
        this.opponent._blockInput = true;
        if (!this.opponent.freeCells()) return this.endGame();
    }
    // ------------------------------------------
    
    updateDisplayScore(target, score) {
        const targetName = target.className.split('-')[0];
        if (!targetName) return;
        const span = createNode('span', {
            textContent: `${targetName} score: ${score}`
        });
        target.replaceChild(span, target.children[Number(targetName === 'player')]);
    }
    
    // same here, only I fell like I can probably refactor this, so it takes less space
    // I am just lazy to do so rn )0
    initPlayerNode() {
        return createNode('div',{
                className: 'player-container',
                children: [ this.player.node, 
                    createNode('span', {
                        textContent: 'player score: '
                    }) 
                ],
            })
    }
    initOpponentNode() {
        return createNode('div', {
            className: 'opponent-container',
            children: [ createNode('span', {
                textContent: 'opponent score: '
            }), this.opponent.node ]
        })
    }
    // -------------------------------------------------------------------------------
    
    endGame() {
        const winnerName = this.player._currentScore > this.opponent._currentScore ? 'player' : 'opponent'
        console.log('Game ended! Winner is: ' + winnerName);
        this.player._blockInput = true;
        this.player._blockInput = true;
    }
}