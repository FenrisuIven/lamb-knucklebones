import { BoardCell } from "../boardCell/boardCell.js";
import './board.css';

export class Board{
    _cells = [];
    _node = null;

    get node() {
        return this._node;
    }
    
    constructor(){
        this.createCellsArray();
        this.createNode();
        this.fillNode();
    }

    createCellsArray() {
        this._cells = Array.from({ length: 9 })
            .map((elem, idx) => new BoardCell(idx));
    }
    
    createNode() {
        const div = document.createElement("div");
        div.classList.add("board");
        this._node = div;
    }
    fillNode() {
        this._cells.forEach((cell) => {
            this._node.appendChild(cell.node);
        });
    }
}