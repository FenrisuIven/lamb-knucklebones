import { createNode, fillNode } from '../../view/nodeGeneration/nodes.js';
import { BoardCell } from "../boardCell/boardCell.js";
import { Dice } from '../dice/dice.js'
import './board.css';

export class Board{
    idx = null;
    cells = [];
    dice = null;
    currentScore = null;
    _node = null;
    blockInput = false;

    get node() {
        return this._node;
    }
    
    constructor({ idx, dice, blockInput }){
        this.idx = idx || 0;
        this.createCellsArray(9);
        if(dice) {
            this.dice = dice;
        }
        else {
            this.createDice();
        }
        this.createNode();
        this.fillNode();
        this.blockInput = blockInput;
    }
    
    createDice() {
        this.dice = new Dice(`dice player-${this.idx}`);
    }
    
    createCellsArray(amountOfCells) {
        const amountOfCols = Math.floor(Math.sqrt(amountOfCells))
        this.cells = Array.from({ length: amountOfCols } )
            .map((_, outerIdx) => {
                let currentCol = [];
                Array.from({length: amountOfCells}).forEach((_, innerIdx) => 
                    innerIdx % amountOfCols === outerIdx ? currentCol.push(new BoardCell(innerIdx, this.idx)) : null)
                return currentCol;
            });
    }
    
    createNode() {
        this._node = createNode("div", {
            className: `board ${this.idx}`
        });
    }
    fillNode() {
        const cellsArray = this.cells.flat().sort((a, b) => a.index - b.index);
        fillNode(this.node, cellsArray.map(elem => elem.node));
    }
    handleInputAttempt(event) {
        if(this.blockInput) return false;
        
        const occupyFirstAvailableRes = this.occupyFirstAvailableCell(event);
        
        if(occupyFirstAvailableRes.status) {
            
        } else {
            return false;
        }
        this.updateScore();
        return occupyFirstAvailableRes;
    }
    
    occupyFirstAvailableCell(clickEventArgs) {
        const colIdx = this.getTargetColumnIndex(clickEventArgs);
        const targetCell = this.cells[colIdx].findLast(elem => !elem.occupied);
        if (targetCell == null) return {
            status: false
        };
        
        targetCell.occupy(this.dice)
        return {
            status: true,
            args: [ colIdx ]
        };
    }
    
    removeValueInCol(val, colIdx) {
        const targetColumn = this.cells[colIdx]
        const cellsToClear = targetColumn.filter(cell => cell._currentScore === val);
        cellsToClear.forEach( cell => cell.clear() );
        this.cells[colIdx] = targetColumn.filter(cell => cell._currentScore !== val);
    }
    
    getTargetColumnIndex(clickEventArgs) {
        const { clientX } = clickEventArgs;
        const { width, left } = this._node.getBoundingClientRect();
        return Math.floor((clientX - left) / (width / this.cells.length))
    }
    
    updateScore() {
        this.currentScore = 0;
        this.cells.forEach(col => {
            col.forEach(elem => {
                if (!elem.currentScore) return;
                const amount = this.amountOfTimesNumIsPresent(col, elem.currentScore);
                this.currentScore += elem.currentScore * amount || 0;
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
        const count = this.cells.flat().reduce((acc, cell) => 
            cell.occupied ? ++acc : acc, 0)
        return count < 9
    }
}