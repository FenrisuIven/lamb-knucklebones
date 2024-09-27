export class BoardCell {
    constructor(idx, occupied = false) {
        if (idx < 0 || idx > 9) {
            throw new RangeError("Value of Board Cell index was outside of range: 0-9");
        }
        this._index = idx == null ? 0 : idx;
        this._occupied = occupied;
    }
    static insertCellInto(targetDiv, cell){
        if (targetDiv == null) {
            throw new Error("Target div is undefined");
        }
        if (cell == null) {
            throw new Error("Cell is undefined");
        }
        targetDiv.innerHTML += `
            <div class="board-cell">
                <p>${cell._index}: ${cell._occupied}</p>
            </div>`;
    }
}