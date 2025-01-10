import '../playerContainer/playerContainer.css';
import { Board } from "../board/board.js";
import { Dice } from "../dice/dice.js";
import { createNode } from "../../view/nodeGeneration/nodes.js";
import {PlayerContainer} from "../playerContainer/playerContainer.js";

export class TurnsController {
    idx = 0;
    dice = null;
    
    constructor() {
        this.initPlayers();
        this.addEventListeners();
    }
    initPlayers() {
        const firstMove = Math.floor(Math.random() * 10);
        const playerMovesFirst = firstMove % 2 === 0;
        this.dice = new Dice(`dice controller-${this.idx}`);
        
        const boards = {
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
        this.containers = {
            player: new PlayerContainer(
                'player', 
                boards.player, 
                !playerMovesFirst
            ),
            opponent: new PlayerContainer(
                'opponent', 
                boards.opponent, 
                playerMovesFirst
            )
        };
        
        console.log('first to move: ' + (firstMove % 2 === 0 ? 'opponent' : 'player'));
    }
    addEventListeners() {
        this.containers.opponent.node.addEventListener('click', (event) => this.handleMoveAttempt(event, { 
            target: this.containers.opponent,
            playerMove: false
        }))
        this.containers.player.node.addEventListener('click', (event) => this.handleMoveAttempt(event, {
            target: this.containers.player,
            playerMove: true
        }))
    }
    
    handleMoveAttempt(event, ctx) {
        const inputAttemptRes = ctx.target.board.handleInputAttempt(event);
        if(!inputAttemptRes.status) return;
        
        let targetContainer = this.containers.player;
        let opponentContainer = this.containers.opponent;
        let opponentBoard = this.containers.opponent.board;
        
        if(!ctx.playerMove){
            targetContainer = this.containers.opponent;
            opponentContainer = this.containers.player;
            opponentBoard = this.containers.player.board;
        }
        
        const opponentColumn = opponentBoard.cells[inputAttemptRes.args[0]];
        if (opponentBoard.amountOfTimesNumIsPresent(opponentColumn, this.dice.score) !== 0) {
            opponentBoard.removeValueInCol(this.dice.score, inputAttemptRes.args[0]);
            opponentBoard.updateScore();
            opponentContainer.updateDisplayScore();
        }

        targetContainer.updateDisplayScore();
        if (!ctx.target.board.freeCells()) return this.endGame();

        this.blockInputForPlayer(this.containers.opponent, !ctx.playerMove);
        this.blockInputForPlayer(this.containers.player, ctx.playerMove);
        
        this.dice.reroll();
    }
    
    blockInputForPlayer(target, isBlocked) {
        target.board.blockInput = isBlocked;
        PlayerContainer.setDisabledStatus(target, isBlocked);
    }
    
    endGame() {
        const winnerName = this.containers.player.board.currentScore > this.containers.opponent.board.currentScore ? 'player' : 'opponent'
        console.log('Game ended! Winner is: ' + winnerName);
        
        player.blockInput = true;
        opponent.blockInput = true;
    }
}