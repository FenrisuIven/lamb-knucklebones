import { createNode } from "../../view/nodeGeneration/nodes.js";

export class PlayerContainer {
    constructor(name, board, isFirstToMove) {
        const scoreDisplay = createNode('span', {
            className: 'score-display',
            textContent: `${name}: `
        });
        const node = createNode('fieldSet',{
            className: `${name}-container`,
            children: [
                scoreDisplay, board.node
            ],
        });
        if (!isFirstToMove) node.disabled = true;
        
        this.board = board;
        this.node = node;
    }
    
    updateDisplayScore(){
        PlayerContainer.setDisplayScore(this, this.board.currentScore);
    }
    
    static setDisabledStatus(target, status) {
        target.node.disabled = status;
    }
    static setDisplayScore(target, score) {
        const targetName = target.node.className.split('-')[0];
        if (!targetName) return;
        const span = document.querySelector(`.${target.node.className} .score-display`);
        span.innerHTML = `${score}`;
        target.node.replaceChild(span, target.node.children[0]);
    }
}