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

  canCapture(row, col) {}
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

export class Rook extends ChessPiece {
  getIcon() {
    return this.player === 1 ? "♖" : "♜";
  }

  getCanMove(position) {
    const moves = [];
    const row = this.row;
    const col = this.col;

    for (let i = row - 1; i >= 0; i--) {
      if (!position[i][col]) moves.push([i, col]);
      else {
        if (position[i][col].player === this.player) break;
        else {
          moves.push([i, col]);
          break;
        }
      }
    }
    for (let i = row + 1; i < 8; i++) {
      if (!position[i][col]) moves.push([i, col]);
      else {
        if (position[i][col].player === this.player) break;
        else {
          moves.push([i, col]);
          break;
        }
      }
    }
    for (let i = col - 1; i >= 0; i--) {
      if (!position[row][i]) moves.push([row, i]);
      else {
        if (position[row][i].player === this.player) break;
        else {
          moves.push([row, i]);
          break;
        }
      }
    }
    for (let i = col + 1; i < 8; i++) {
      if (!position[row][i]) moves.push([row, i]);
      else {
        if (position[row][i].player === this.player) break;
        else {
          moves.push([row, i]);
          break;
        }
      }
    }
    console.log(moves);
    return moves;
  }

  getCopy(row = this.row, col = this.col) {
    return new Rook(this.player, row, col);
  }
}

export class Knight extends ChessPiece {
  getIcon() {
    return this.player === 1 ? "♘" : "♞";
  }

  getCanMove(position) {
    const moves = [];
    const row = this.row;
    const col = this.col;

    const isValidMove = (targetRow, targetCol) => {
      return (
        targetRow >= 0 &&
        targetRow < 8 &&
        targetCol >= 0 &&
        targetCol < 8 &&
        (!position[targetRow][targetCol] ||
          position[targetRow][targetCol].player !== this.player)
      );
    };

    if (row - 2 >= 0) {
      if (isValidMove(row - 2, col - 1)) moves.push([row - 2, col - 1]);
      if (isValidMove(row - 2, col + 1)) moves.push([row - 2, col + 1]);
    }
    if (row + 2 < 8) {
      if (isValidMove(row + 2, col - 1)) moves.push([row + 2, col - 1]);
      if (isValidMove(row + 2, col + 1)) moves.push([row + 2, col + 1]);
    }
    if (col - 2 >= 0) {
      if (isValidMove(row - 1, col - 2)) moves.push([row - 1, col - 2]);
      if (isValidMove(row + 1, col - 2)) moves.push([row + 1, col - 2]);
    }
    if (col + 2 < 8) {
      if (isValidMove(row - 1, col + 2)) moves.push([row - 1, col + 2]);
      if (isValidMove(row + 1, col + 2)) moves.push([row + 1, col + 2]);
    }

    return moves;
  }

  getCopy(row = this.row, col = this.col) {
    return new Knight(this.player, row, col);
  }
}

export class Bishop extends ChessPiece {
  getIcon() {
    return this.player === 1 ? "♗" : "♝";
  }

  getCanMove(position) {
    const moves = [];
    const row = this.row;
    const col = this.col;

    // Check all four diagonal directions
    const directions = [
      [-1, -1], // top-left
      [-1, 1], // top-right
      [1, -1], // bottom-left
      [1, 1], // bottom-right
    ];

    for (const [rowIncrement, colIncrement] of directions) {
      let newRow = row + rowIncrement;
      let newCol = col + colIncrement;

      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (!position[newRow][newCol]) {
          moves.push([newRow, newCol]);
        } else {
          if (position[newRow][newCol].player !== this.player) {
            moves.push([newRow, newCol]);
          }
          break; // Stop if another piece is encountered
        }
        newRow += rowIncrement;
        newCol += colIncrement;
      }
    }

    return moves;
  }

  getCopy(row = this.row, col = this.col) {
    return new Bishop(this.player, row, col);
  }
}

export class Queen extends ChessPiece {
  getIcon() {
    return this.player === 1 ? "♕" : "♛";
  }

  getCanMove(position) {
    const moves = [];
    const row = this.row;
    const col = this.col;

    const isValidMove = (targetRow, targetCol) => {
      return (
        targetRow >= 0 &&
        targetRow < 8 &&
        targetCol >= 0 &&
        targetCol < 8 &&
        (!position[targetRow][targetCol] ||
          position[targetRow][targetCol].player !== this.player)
      );
    };

    // Directions for Queen: all 8 possible directions (vertical, horizontal, diagonal)
    const directions = [
      [-1, 0], // up
      [1, 0], // down
      [0, -1], // left
      [0, 1], // right
      [-1, -1], // top-left
      [-1, 1], // top-right
      [1, -1], // bottom-left
      [1, 1], // bottom-right
    ];

    for (const [rowIncrement, colIncrement] of directions) {
      let newRow = row + rowIncrement;
      let newCol = col + colIncrement;

      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (!position[newRow][newCol]) {
          moves.push([newRow, newCol]);
        } else {
          if (position[newRow][newCol].player !== this.player) {
            moves.push([newRow, newCol]);
          }
          break; // Stop if another piece is encountered
        }
        newRow += rowIncrement;
        newCol += colIncrement;
      }
    }

    return moves;
  }

  getCopy(row = this.row, col = this.col) {
    return new Queen(this.player, row, col);
  }
}

export class King extends ChessPiece {
  getIcon() {
    return this.player === 1 ? "♔" : "♚";
  }

  getCanMove(position) {}
}
