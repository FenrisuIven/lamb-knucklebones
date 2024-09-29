import { BoardCell } from "../boardCell/boardCell.js";

export class Board{
    createCellsArray = () => (this._cells = []).length = 9;
    initCellsArray(){
        if (!this.getCellsArray()) this.createCellsArray();
        for (let i = 0; i < 9; i++) {
            this._cells[i] = new BoardCell(i);
        }
    }
    getCellsArray = () => this._cells;
    
    createNode() {
        const div = document.createElement("div");
        div.classList.add("board");
        this._node = div;
    }
    initNode() {
        if(!this.getNode()) this.createNode();
        this.getCellsArray().forEach((cell) => {
            this.getNode().appendChild(cell.getNode());
        });
    }
    getNode = () => this._node;
    
    constructor(){
        this.initCellsArray();
        this.initNode();
    }
    
}