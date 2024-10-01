import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import './boardCell.css';

export class BoardCell {
    _index = null;
    _occupied = false;

    get index() {
        return this._index;
    }
    get occupied (){
        return this._occupied;
    }
    get node() {
        return this._node;
    };
    set index (idx) {
        if (!Number.isInteger(idx)) throw new Error(ERROR_MESSAGES.NOT_AN_INTEGER);
        if (idx < 0) throw new RangeError(ERROR_MESSAGES.INCORRECT_BOARD_CELL_IDX);

        this._index = idx;
    }
    set occupied(occupied) {
        if (typeof occupied !== "boolean") throw new Error(ERROR_MESSAGES.NOT_A_BOOLEAN);

        this._occupied = occupied;
    }
    
    constructor(idx) {
        this.index = idx;
        this.createNode();
        this.initNode();
    }
    
    createNode() {
        const div = document.createElement("div");
        div.classList.add("board-cell");
        this._node = div;
    }
    initNode() {
        const { index, occupied } = this;
        this.node.innerHTML += `<span>${index}: ${occupied}</span>`;
        this.node.addEventListener("click", () => {
            console.log(`click: ${index}`);
        })
    }
}

