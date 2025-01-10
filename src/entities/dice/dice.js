import {clearChildren, createNode, fillNode} from '../../view/nodeGeneration/nodes.js';
import './dice.css';

export class Dice {
    scores = [1, 2, 3, 4, 5, 6];
    currentScoreIdx = 0;
    node = null;
    
    get spanNode() {
        return createNode("span", {
            textContent: `${this.score}`
        });
    }
    get score() {
        return this.scores[this.currentScoreIdx];
    }
    set score(value){
        this.currentScoreIdx = value - 1 === 0 ? 0 : value - 1;
        this.fillNode();
    }
    
    constructor(className) {
        this.createNode(className);
        this.fillNode();
        this.reroll();
    }
    createNode(className) {
        this.node = createNode("div", {
            className: className
        });
    }
    fillNode() {
        clearChildren(this.node)
        fillNode(this.node, [ this.spanNode ]);
    }

    reroll() {
        const prevScore = this.score;
        let score = prevScore;
        while(score === prevScore) {
            score = Math.floor(Math.random() * this.scores.length);
        }
        this.score = score < 1 ? 1 : score;
    }
}