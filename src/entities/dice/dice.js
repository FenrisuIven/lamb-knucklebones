import {clearChildren, createNode, fillNode} from '../../view/nodeGeneration/nodes.js';
import './dice.css';

export class Dice {
    _scores = [1, 2, 3, 4, 5, 6];
    _currentScoreIdx = 0;
    _node = null;
    
    get currentScore() {
        return this._scores[this._currentScoreIdx];
    }
    get node(){
        return this._node;
    }
    set score(value){
        this._currentScoreIdx = value - 1 === 0 ? 0 : value - 1;
        this.fillNode();
    }
    constructor() {
        this.createNode();
        this.fillNode();
    }
    createNode() {
        this._node = createNode("div", {
            className: "dice"
        });
    }
    fillNode() {
        clearChildren(this._node)
        fillNode(this._node, [
            createNode("span", {
                textContent: `${this.currentScore}`
            })
        ]);
    }
}