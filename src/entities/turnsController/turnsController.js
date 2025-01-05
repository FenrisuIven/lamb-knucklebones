import { Board } from "../board/board.js";
import { Dice } from "../dice/dice.js";
import { createNode } from "../../view/nodeGeneration/nodes.js";

export class TurnsController {
    idx = 0;
    players = {};
    dice = null;
    
    constructor() {
        this.initPlayers();
        this.addEventListeners();
    }
    initPlayers() {
        const firstMove = Math.floor(Math.random() * 10);
        this.dice = new Dice(`dice controller-${this.idx}`);
        
        this.players = {
            player: new Board({
                idx: this.idx,
                dice: this.dice,
                blockInput: firstMove % 2 === 0
            }),
            opponent: new Board({
                idx: this.idx,
                dice: this.dice,
                blockInput: firstMove % 2 !== 0
            })
        };

        this.players.playerNode = this.initPlayerNode(true);
        this.players.opponentNode = this.initPlayerNode(false);
        
        console.log('first to move: ' + (firstMove % 2 === 0 ? 'opponent' : 'player'));
    }
    addEventListeners() {
        this.players.opponentNode.addEventListener('click', (event) => this.handleMoveAttempt(event, { 
            target: this.players.opponent,
            playerMove: false
        }))
        this.players.playerNode.addEventListener('click', (event) => this.handleMoveAttempt(event, {
            target: this.players.player,
            playerMove: true
        }))
    }
    
    handleMoveAttempt(event, ctx) {
        if(!ctx.target.handleInputAttempt(event)) return;
        const targetNode = ctx.playerMove ? this.players.playerNode : this.players.opponentNode;

        this.updateDisplayScore(targetNode, ctx.target.currentScore);

        this.players.opponent.blockInput = !ctx.playerMove;
        this.players.player.blockInput = ctx.playerMove;
        if (!ctx.target.freeCells()) return this.endGame();
    }
    
    updateDisplayScore(target, score) {
        const targetName = target.className.split('-')[0];
        if (!targetName) return;
        const span = createNode('span', {
            textContent: `${targetName} score: ${score}`
        });
        target.replaceChild(span, target.children[Number(targetName === 'player')]);
    }
    
    initPlayerNode(targetIsPlayer) {
        const { player, opponent } = this.players;
        const name = targetIsPlayer ? 'player' : 'opponent';
        
        return createNode('div',{
                className: `${name}-container`,
                children: [ targetIsPlayer ? player.node : null, 
                    createNode('span', {
                        textContent: `${name} score: `
                    }) ,
                    !targetIsPlayer ? opponent.node : null,
                ],
            })
    }
    
    endGame() {
        const { player, opponent } = this.players;
        const winnerName = player.currentScore > opponent.currentScore ? 'player' : 'opponent'
        console.log('Game ended! Winner is: ' + winnerName);
        
        player.blockInput = true;
        opponent.blockInput = true;
    }
}