export class BoardCell {
    setIndex (idx) {
        if (!Number.isInteger(idx)) {
            throw new Error("Value of Board Cell index was not of integer type");
        }
        if (idx < 0 || idx > 9) {
            throw new RangeError("Value of Board Cell index was outside of range: 0-9");
        }
        this._index = idx;
    }
    getIndex = () => this._index;
    
    setOccupied(occ) {
        if (typeof occ !== "boolean") {
            throw new Error("Value of Board Cell occupied was not boolean");
        }
        this._occupied = occ;
    }
    getOccupied = () => this._occupied;

    createNode() {
        const div = document.createElement("div");
        div.classList.add("board-cell");
        this._node = div;
    }
    initNode() {
        if(!this._node) this.createNode();
        this.getNode().innerHTML += `<span>${this.getIndex()}: ${this.getOccupied()}</span>`;
        this.getNode().addEventListener("click", () => {
            console.log(`click: ${this.getIndex()}`);
        })
    }
    getNode = () => this._node;
    
    constructor(idx) {
        this.setIndex(idx);
        this.setOccupied(false);
        this.initNode();
    }
}

