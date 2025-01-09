import './playerContainer.css';
import { Board } from "../board/board.js";
import { Dice } from "../dice/dice.js";
import { createNode } from "../../view/nodeGeneration/nodes.js";

export class TurnsController {
    idx = 0;
    entities = {};
    dice = null;
    
    constructor() {
        this.initPlayers();
        this.addEventListeners();
    }
    initPlayers() {
        const firstMove = Math.floor(Math.random() * 10);
        const playerMovesFirst = firstMove % 2 === 0;
        this.dice = new Dice(`dice controller-${this.idx}`);
        
        this.entities = {
            player: new Board({
                idx: this.idx,
                dice: this.dice,
                blockInput: playerMovesFirst
            }),
            opponent: new Board({
                idx: this.idx,
                dice: this.dice,
                blockInput: !playerMovesFirst
            })
        };

        this.entities.playerNode = this.initPlayerNode(true, playerMovesFirst);
        this.entities.opponentNode = this.initPlayerNode(false, !playerMovesFirst);
        
        console.log('first to move: ' + (firstMove % 2 === 0 ? 'opponent' : 'player'));
    }
    addEventListeners() {
        this.entities.opponentNode.addEventListener('click', (event) => this.handleMoveAttempt(event, { 
            target: this.entities.opponent,
            playerMove: false
        }))
        this.entities.playerNode.addEventListener('click', (event) => this.handleMoveAttempt(event, {
            target: this.entities.player,
            playerMove: true
        }))
    }
    
    handleMoveAttempt(event, ctx) {
        if(!ctx.target.handleInputAttempt(event)) return;
        const targetNode = ctx.playerMove ? this.entities.playerNode : this.entities.opponentNode;

        this.updateDisplayScore(targetNode, ctx.target.currentScore);

        this.blockInputForPlayer({
            entity: this.entities.opponent,
            entityNode: this.entities.opponentNode
        }, !ctx.playerMove);
        this.blockInputForPlayer({
            entity: this.entities.player,
            entityNode: this.entities.playerNode
        }, ctx.playerMove);
        
        if (!ctx.target.freeCells()) return this.endGame();
    }
    
    blockInputForPlayer(target, isBlocked) {
        target.entity.blockInput = isBlocked;
        if (isBlocked) {
            target.entityNode.classList.add('inactive');
        } else {
            target.entityNode.classList.remove('inactive');
        }
    }
    
    updateDisplayScore(target, score) {
        const targetName = target.className.split('-')[0];
        if (!targetName) return;
        const span = document.querySelector(`.${target.className} .score-display`);
        span.innerHTML = `${targetName}: ${score}`;
        target.replaceChild(span, target.children[Number(targetName === 'player')]);
    }
    
    initPlayerNode(targetIsPlayer, setInactive) {
        const { player, opponent } = this.entities;
        const name = targetIsPlayer ? 'player' : 'opponent';
        
        return createNode('div',{
                className: `${name}-container${setInactive ? ' inactive' : ''}`,
                children: [ targetIsPlayer ? player.node : null, 
                    createNode('span', {
                        className: 'score-display',
                        textContent: `${name}: `
                    }) ,
                    !targetIsPlayer ? opponent.node : null,
                ],
            })
    }
    
    endGame() {
        const { player, opponent } = this.entities;
        const winnerName = player.currentScore > opponent.currentScore ? 'player' : 'opponent'
        console.log('Game ended! Winner is: ' + winnerName);
        
        player.blockInput = true;
        opponent.blockInput = true;
    }
}