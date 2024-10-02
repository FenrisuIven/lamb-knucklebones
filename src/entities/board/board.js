import { createNode, initNode } from '../../view/nodeGeneration/nodes.js';
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
        this._node = createNode("div", {
            className: "board"
        });
    }
    fillNode() {
        initNode(this._node, this._cells.map(cell => cell._node))
    }
}