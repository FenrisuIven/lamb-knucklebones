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

    get node() {
        return this._node;
    }
    
    constructor(){
        this._idx = 0;
        this.createDice();
        this.createCellsArray(9);
        this.createNode();
        this.fillNode();
        console.log(this._cells)
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
                console.log(currentCol)
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
        this._node.addEventListener("click", (e) => {
            this.occupyFirstAvailableCell(e);
            this.updateScore();
            console.log(this._currentScore)
        });
    }
    
    occupyFirstAvailableCell(clickEventArgs) {
        const { clientX } = clickEventArgs;
        const { width } = this._node.getBoundingClientRect(); 
        const collIdx = Math.floor(clientX / (width / this._cells.length));
        const cell = this._cells[collIdx].findLast(elem => !elem.occupied);
        cell.occupyCell(this._dice.currentScore);
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
}