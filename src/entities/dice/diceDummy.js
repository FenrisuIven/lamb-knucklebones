import { createNode, fillNode } from '../../view/nodeGeneration/nodes.js';

export class DiceDummy {
    dice = null;
    node = null;
    constructor(dice) {
        this.dice = dice;
        this.createNode();
        this.fillNode();
    }
    
    createNode() {
        this.node = createNode("div", {
            className: "dice-dummy"
        });
    }
    fillNode() {
        fillNode(this.node, [
            createNode("span", {
                textContent: `${this.dice.score}`
            })
        ]);
    }
}