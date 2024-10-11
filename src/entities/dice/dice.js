import {clearChildren, createNode, fillNode} from '../../view/nodeGeneration/nodes.js';
import './dice.css';

export class Dice {
    _scores = [1, 2, 3, 4, 5, 6];
    _currentScoreIdx = 0;
    _node = null;
    
    
    get node(){
        return this._node;
    }
    get spanNode() {
        return createNode("span", {
            textContent: `${this.score}`
        });
    }
    get score() {
        return this._scores[this._currentScoreIdx];
    }
    set score(value){
        this._currentScoreIdx = value - 1 === 0 ? 0 : value - 1;
        this.fillNode();
    }
    
    constructor(className) {
        this.createNode(className);
        this.fillNode();
        this.reroll();
    }
    createNode(className) {
        this._node = createNode("div", {
            className: className
        });
    }
    fillNode() {
        clearChildren(this._node)
        fillNode(this._node, [ this.spanNode ]);
    }

    reroll() {
        const prevScore = this.score;
        let score = Math.floor(Math.random() * this._scores.length);
        
        while(score === prevScore) {
            // console.log('reroll')
            score = Math.floor(Math.random() * this._scores.length);
        }
        this.score = score < 1 ? 1 : score;
    }
}