import { 
    clearChildren, createNode, fillNode 
} from '../../view/nodeGeneration/nodes.js';
import { DiceDummy } from "../dice/diceDummy.js";
import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import './boardCell.css';

export class BoardCell {
    index = null;
    currentScore = null;
    occupied = false;

    set index (idx) {
        if (!Number.isInteger(idx)) throw new Error(ERROR_MESSAGES.NOT_AN_INTEGER);
        if (idx < 0) throw new RangeError(ERROR_MESSAGES.LESS_THAN_ZERO);

        this.index = idx;
    }
    set currentScore(val) {
        if (val < 0) throw new RangeError(ERROR_MESSAGES.LESS_THAN_ZERO);
        
        this.currentScore = val;
    }
    set occupied(occupied) {
        if (typeof occupied !== "boolean") throw new Error(ERROR_MESSAGES.NOT_A_BOOLEAN);

        this.occupied = occupied;
    }

    constructor(idx) {
        this.index = idx;
        this.createNode();
    }
    
    createNode() {
        this.node = createNode("div", { 
            className: "board-cell" 
        });
    }

    occupy(dice) {
        this.currentScore = dice.score;
        this.occupied = true;
        this.insertDummyDice(dice);
    }

    clear() {
        this.currentScore = null;
        this.occupied = false;
        this.removeDummyDice();
    }
    
    insertDummyDice(dice) {
        const dummy = new DiceDummy(dice);
        fillNode(this.node, [ dummy.node ], true);
    }
    removeDummyDice() {
        clearChildren(this.node);
    }
}

