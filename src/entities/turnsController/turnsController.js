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
            playerBoard: new Board({
                idx: this.idx,
                dice: this.dice,
                blockInput: playerMovesFirst
            }),
            opponentBoard: new Board({
                idx: this.idx,
                dice: this.dice,
                blockInput: !playerMovesFirst
            })
        };

        this.entities.playerContainer = this.initPlayerNode(true, playerMovesFirst);
        this.entities.opponentContainer = this.initPlayerNode(false, !playerMovesFirst);
        
        console.log('first to move: ' + (firstMove % 2 === 0 ? 'opponent' : 'player'));
    }
    addEventListeners() {
        this.entities.opponentContainer.addEventListener('click', (event) => this.handleMoveAttempt(event, { 
            target: this.entities.opponentBoard,
            playerMove: false
        }))
        this.entities.playerContainer.addEventListener('click', (event) => this.handleMoveAttempt(event, {
            target: this.entities.playerBoard,
            playerMove: true
        }))
    }
    
    handleMoveAttempt(event, ctx) {
        const inputAttemptRes = ctx.target.handleInputAttempt(event);
        if(!inputAttemptRes.status) return;
        
        let targetContainer = this.entities.playerContainer;
        let opponentContainer = this.entities.opponentContainer;
        let opponentBoard = this.entities.opponentBoard;
        
        if(!ctx.playerMove){
            targetContainer = this.entities.opponentContainer;
            opponentBoard = this.entities.playerBoard;
            opponentContainer = this.entities.playerContainer;
        }
        
        const opponentColumn = opponentBoard.cells[inputAttemptRes.args[0]];
        if (opponentBoard.amountOfTimesNumIsPresent(opponentColumn, this.dice.score) !== 0) {
            opponentBoard.removeValueInCol(this.dice.score, inputAttemptRes.args[0]);
            opponentBoard.updateScore();
            this.updateDisplayScore(opponentContainer, opponentBoard.currentScore);
        }

        this.updateDisplayScore(targetContainer, ctx.target.currentScore);
        if (!ctx.target.freeCells()) return this.endGame();

        this.blockInputForPlayer({
            entityBoard: this.entities.opponentBoard,
            entityContainer: this.entities.opponentContainer
        }, !ctx.playerMove);
        this.blockInputForPlayer({
            entityBoard: this.entities.playerBoard,
            entityContainer: this.entities.playerContainer
        }, ctx.playerMove);
        
        this.dice.reroll();
    }
    
    blockInputForPlayer(target, isBlocked) {
        target.entityBoard.blockInput = isBlocked;
        target.entityContainer.disabled = isBlocked;
    }
    
    updateDisplayScore(target, score) {
        const targetName = target.className.split('-')[0];
        if (!targetName) return;
        const span = document.querySelector(`.${target.className} .score-display`);
        span.innerHTML = `${score}`;
        target.replaceChild(span, target.children[Number(targetName === 'player')]);
    }
    
    initPlayerNode(targetIsPlayer, setDisabled) {
        const { playerBoard, opponentBoard } = this.entities;
        const name = targetIsPlayer ? 'player' : 'opponent';
        
        const scoreDisplay = createNode('span', {
            className: 'score-display',
            textContent: `${name}: `
        });
        
        const node = createNode('fieldSet',{
            className: `${name}-container`,
            children: [ 
                targetIsPlayer ? playerBoard.node : null,
                scoreDisplay,
                !targetIsPlayer ? opponentBoard.node : null,
            ],
        });
        if (setDisabled) node.disabled = true;
        
        return node;
    }
    
    endGame() {
        const { playerBoard, opponentBoard } = this.entities;
        const winnerName = playerBoard.currentScore > opponentBoard.currentScore ? 'player' : 'opponent'
        console.log('Game ended! Winner is: ' + winnerName);
        
        playerBoard.blockInput = true;
        opponentBoard.blockInput = true;
    }
}