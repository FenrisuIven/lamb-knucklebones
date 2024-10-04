import {clearChildren, createNode, fillNode} from '../../view/nodeGeneration/nodes.js';
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import './boardCell.css';

export class BoardCell {
    _index = null;
    _currentScore = null;
    _occupied = false;
    _parentIdx = null;

    get index() {
        return this._index;
    }
    get occupied (){
        return this._occupied;
    }
    get currentScore() {
        return this._currentScore;
    }
    get node() {
        return this._node;
    };
    set index (idx) {
        if (!Number.isInteger(idx)) throw new Error(ERROR_MESSAGES.NOT_AN_INTEGER);
        if (idx < 0) throw new RangeError(ERROR_MESSAGES.LESS_THAN_ZERO);

        this._index = idx;
    }
    set currentScore(val) {
        if (val < 0) throw new RangeError(ERROR_MESSAGES.LESS_THAN_ZERO);
        
        this._currentScore = val;
    }
    set occupied(occupied) {
        if (typeof occupied !== "boolean") throw new Error(ERROR_MESSAGES.NOT_A_BOOLEAN);

        this._occupied = occupied;
    }

    constructor(idx, parentIdx) {
        this.index = idx;
        this._parentIdx = parentIdx;
        this.createNode();
        this.initNode();
    }
    
    createNode() {
        this._node = createNode("div", { 
            className: "board-cell" 
        });
    }
    initNode() {
        this.updateSpanContents();
        /*this.node.addEventListener("click", () => {
            // console.log(this)
            if (this.occupied) {
                this.clearCell();
            }
            else {
                const playerDice = document.querySelector(`.player-${this._parentIdx}`);
                if(!playerDice.children[0]) return;
                this.occupyCell(playerDice.children[0].textContent);
            }
        })*/
    }
    
    occupyCell(score) {
        this.currentScore = score;
        this.occupied = true;
        this.updateSpanContents();
    }
    clearCell(score) {
        this.currentScore = null;
        this.occupied = false;
        this.updateSpanContents();
    }
    updateSpanContents = () => 
        this.node.innerHTML = `<span>${this.index}: ${this.occupied} ${this.currentScore}</span>`;
}

