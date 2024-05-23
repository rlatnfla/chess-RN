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
import { CanGo, ChessPiece, Pawn } from "../components/ChessPiece.js";

export default function App() {
  const initPosition = Array(8)
    .fill(null)
    .map(() =>
      Array(8)
        .fill(null)
        .map(() => null)
    );
  initPosition[1][0] = new Pawn(2, 1, 0);

  const [position, setPosition] = useState(initPosition);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState(null);

  useEffect(() => {
    if (selectedPiece !== null) {
      const [row, col] = selectedPiece;
      const posMove = position[row][col].getCanMove(position);

      setPossibleMoves(posMove);
    } else {
      setPossibleMoves(null);
    }
  }, [selectedPiece]);

  console.log(possibleMoves);

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
        const newPosition = JSON.parse(JSON.stringify(position));
        newPosition[row][col] = position[selectedRow][selectedCol].getCopy(
          row,
          col
        );
        newPosition[selectedRow][selectedCol] = null;

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
