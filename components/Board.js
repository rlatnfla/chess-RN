import { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { CanGo } from "./ChessPiece.js";

export default function Board({
  position,
  onPiecePress,
  possibleMoves,
  selectedPiece,
}) {
  const renderSquare = (row, col) => {
    const isBlack = (row + col) % 2 === 1;
    const piece = position[row][col];
    const [selectedRow, selectedCol] = selectedPiece
      ? selectedPiece
      : [null, null];
    let squareColor;
    if (selectedRow === row && selectedCol === col) {
      squareColor = "green";
    } else if (
      possibleMoves !== null &&
      possibleMoves.some(([r, c]) => {
        if (r === row && c === col) return true;
      })
    ) {
      squareColor = "blue";
    } else {
      squareColor = isBlack ? "black" : "white";
    }
    return (
      <Pressable
        key={`${row}-${col}`}
        style={[styles.square, { backgroundColor: squareColor }]}
        onPress={() => {
          onPiecePress(row, col);
        }}
      >
        {piece ? (
          <View>
            <Text style={styles.pieceText}>{piece.getIcon()}</Text>
          </View>
        ) : null}
      </Pressable>
    );
  };

  const renderRow = (row) => {
    return (
      <View
        key={row}
        style={styles.row}
      >
        {Array.from({ length: 8 }).map((_, col) => renderSquare(row, col))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: 8 }).map((_, row) => renderRow(row))}
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
  },
  row: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  piece: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 3,
  },
  pieceText: {
    color: "tomato",
    fontWeight: "bold",
    fontSize: 30,
  },
});
