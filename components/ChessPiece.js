export class ChessPiece {
  constructor(player, row, col) {
    this.player = player;
    this.row = row;
    this.col = col;
  }

  getIcon() {
    return null;
  }
  getCanMove() {}

  getCopy(row = this.row, col = this.col) {}
}

export class Pawn extends ChessPiece {
  getIcon() {
    return this.player === 1 ? "♙" : "♟";
  }

  getCanMove(position) {
    const direction = this.player === 1 ? -1 : 1;
    const moves = [];
    const row = this.row;
    const col = this.col;

    // Single step forward
    if (
      row + direction >= 0 &&
      row + direction < 8 &&
      position[row + direction][col] === null
    ) {
      console.log(row + direction);
      moves.push([row + direction, col]);
    }

    // Double step forward (initial move)
    if (
      ((this.player === 1 && row === 6) || (this.player === 2 && row === 1)) &&
      position[row + direction][col] === null &&
      position[row + direction * 2][col] === null
    ) {
      moves.push([row + direction * 2, col]);
    }
    // Capture diagonally
    if (
      col - 1 >= 0 &&
      row + direction >= 0 &&
      row + direction < 8 &&
      position[row + direction][col - 1] !== null &&
      position[row + direction][col - 1].player !== this.player
    ) {
      moves.push([row + direction, col - 1]);
    }
    if (
      col + 1 < 8 &&
      row + direction >= 0 &&
      row + direction < 8 &&
      position[row + direction][col + 1] !== null &&
      position[row + direction][col + 1].player !== this.player
    ) {
      moves.push([row + direction, col + 1]);
    }

    return moves;
  }

  getCopy(row = this.row, col = this.col) {
    return new Pawn(this.player, row, col);
  }
}
