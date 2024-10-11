import { createNode, fillNode } from '../../view/nodeGeneration/nodes.js';
import { BoardCell } from "../boardCell/boardCell.js";
import { Dice } from '../dice/dice.js'
import './board.css';

export class Board{
    _idx = null;
    _cells = [];
    _dice = null;
    _currentScore = null;
    _node = null;
    _blockInput = false;
    _boardFull = false;

    get node() {
        return this._node;
    }
    
    constructor({ idx, dice, blockInput }){
        this._idx = idx || 0;
        this.createCellsArray(9);
        if(dice) {
            this._dice = dice;
        }
        else {
            this.createDice();
        }
        this.createNode();
        this.fillNode();
        this._blockInput = blockInput;
    }
    
    createDice() {
        this._dice = new Dice(`dice player-${this._idx}`);
    }
    
    createCellsArray(amountOfCells) {
        const amountOfCols = Math.floor(Math.sqrt(amountOfCells))
        this._cells = Array.from({ length: amountOfCols } )
            .map((_, outerIdx) => {
                let currentCol = [];
                Array.from({length: amountOfCells}).forEach((_, innerIdx) => 
                    innerIdx % amountOfCols === outerIdx ? currentCol.push(new BoardCell(innerIdx, this._idx)) : null)
                return currentCol;
            });
    }
    
    createNode() {
        this._node = createNode("div", {
            className: `board ${this._idx}`
        });
    }
    fillNode() {
        const cellsArray = this._cells.flat().sort((a, b) => a._index - b._index);
        fillNode(this._node, cellsArray.map(elem => elem.node));
    }
    handleInputAttempt(event) {
        if(this._blockInput) return false;
        if(this.occupyFirstAvailableCell(event)) {
            this._dice.reroll();
        }
        this.updateScore();
        return true;
    }
    
    occupyFirstAvailableCell(clickEventArgs) {
        const colIdx = this.getTargetColumnIndex(clickEventArgs);
        const targetCell = this._cells[colIdx].findLast(elem => !elem.occupied);
        targetCell?.occupy(this._dice)
        return !!targetCell
    }
    
    getTargetColumnIndex(clickEventArgs) {
        const { clientX } = clickEventArgs;
        const { width } = this._node.getBoundingClientRect();
        return Math.floor(clientX / (width / this._cells.length))
    }
    
    updateScore() {
        this._currentScore = 0;
        this._cells.forEach(col => {
            col.forEach(elem => {
                if (!elem.currentScore) return;
                const amount = this.amountOfTimesNumIsPresent(col, elem.currentScore);
                this._currentScore += elem.currentScore * amount || 0;
            })
        })
    }
    
    amountOfTimesNumIsPresent(array, val){
        let count = 0;
        array.forEach(elem => 
            elem.currentScore === val ? count++ : count);
        return count;   
    }
    
    freeCells() {
        const count = this._cells.flat().reduce((acc, cell) => 
            cell.occupied ? ++acc : acc, 0)
        return count < 9
    }
}