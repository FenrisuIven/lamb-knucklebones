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
        const div = document.createElement("div");
        div.classList.add("dice");
        this._node = div;
    }
    fillNode() {
        let count = 0;
        this._node.replaceChildren()
        const container = document.createElement("div");
        container.classList.add("dice-container");
        this._node.appendChild(container);
        
        Array.from( { length: this.currentScore }).forEach((elem, idx) => {
            const pip = document.createElement("div");
            if (this.currentScore === 5 && idx === 2) {
                pip.style.gridColumn = 'span 2';
            }
            pip.classList.add(`dice-pip`);
            container.appendChild(pip);
        })
    }
}