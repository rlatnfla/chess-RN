import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Board from "../components/Board.js";
import { useEffect, useState } from "react";
import {
  Bishop,
  ChessPiece,
  Knight,
  Pawn,
  Queen,
  Rook,
} from "../components/ChessPiece.js";

export default function App() {
  function initBoard() {
    const board = Array(8)
      .fill(null)
      .map((r, rowIndex) => {
        if (rowIndex === 1) {
          return Array(8)
            .fill(null)
            .map((_, colIndex) => new Pawn(2, rowIndex, colIndex));
        } else if (rowIndex === 6) {
          return Array(8)
            .fill(null)
            .map((_, colIndex) => new Pawn(1, rowIndex, colIndex));
        } else if (rowIndex === 0) {
          return Array(8)
            .fill(null)
            .map((c, colIndex) => {
              if (colIndex === 0 || colIndex === 7)
                return new Rook(2, rowIndex, colIndex);
              else if (colIndex === 1 || colIndex === 6)
                return new Knight(2, rowIndex, colIndex);
              else if (colIndex === 2 || colIndex === 5)
                return new Bishop(2, rowIndex, colIndex);
              else if (colIndex === 3) return new Queen(2, rowIndex, colIndex);
              else return null;
            });
        } else if (rowIndex === 7) {
          return Array(8)
            .fill(null)
            .map((c, colIndex) => {
              if (colIndex === 0 || colIndex === 7)
                return new Rook(1, rowIndex, colIndex);
              else if (colIndex === 1 || colIndex === 6)
                return new Knight(1, rowIndex, colIndex);
              else if (colIndex === 2 || colIndex === 5)
                return new Bishop(1, rowIndex, colIndex);
              else if (colIndex === 3) return new Queen(1, rowIndex, colIndex);
              else return null;
            });
        } else return Array(8).fill(null);
      });

    return board;
  }

  const initPosition = initBoard();

  const [position, setPosition] = useState(initPosition);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState(null);
  const [player, setPlayer] = useState(null);

  console.log(player);

  useEffect(() => {
    setPlayer(1);
  }, []);

  useEffect(() => {
    if (selectedPiece !== null) {
      const [row, col] = selectedPiece;
      const posMove = position[row][col].getCanMove(position);

      setPossibleMoves(posMove);
    } else {
      setPossibleMoves(null);
    }
  }, [selectedPiece]);

  // after board changed(when piece moved), change player
  useEffect(() => {
    setPlayer(player === 1 ? 2 : 1);
  }, [position]);

  const onPiecePress = (row, col) => {
    const pressedPiece = position[row][col];
    if (pressedPiece === null) {
      if (
        !(
          possibleMoves &&
          possibleMoves.some(([r, c]) => {
            if (row === r && col === c) return true;
            return false;
          })
        )
      ) {
        console.log("fuck");
        return;
      }
    } else if (pressedPiece.player !== player) {
      if (!selectedPiece) return;
    }

    if (selectedPiece) {
      const [selectedRow, selectedCol] = selectedPiece;

      // cancel select
      if (row === selectedRow && col === selectedCol) {
        setSelectedPiece(null);
        return;
      }

      // move
      if (
        possibleMoves.some(([r1, c1]) => {
          if (row === r1 && col === c1) return true;
          return false;
        })
      ) {
        const newPosition = position.map((r, rowIndex) =>
          r.map((c, colIndex) => c)
        );
        newPosition[selectedRow][selectedCol] = null;
        newPosition[row][col] = position[selectedRow][selectedCol].getCopy(
          row,
          col
        );

        setPosition(newPosition);
        setSelectedPiece(null);
      }
    } else {
      setSelectedPiece([row, col]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Board
        position={position}
        onPiecePress={onPiecePress}
        possibleMoves={possibleMoves}
        selectedPiece={selectedPiece}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
