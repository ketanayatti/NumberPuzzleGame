/**
 * Grid Component
 * Renders the puzzle grid and manages cell layout
 * Fully scalable - supports any N x N grid size
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Cell } from './Cell';
import { GridState } from '../types';

interface GridProps {
  gridState: GridState;
  onCellPress: (row: number, col: number) => void;
  isShaking?: boolean;
  isAnimatingSuccess?: boolean;
  isAnimatingError?: boolean;
  testID?: string;
}

export const Grid: React.FC<GridProps> = ({
  gridState,
  onCellPress,
  isShaking = false,
  isAnimatingSuccess = false,
  isAnimatingError = false,
  testID,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const padding = 16;
  const availableWidth = screenWidth - padding * 2;
  const gridGap = 10;
  const cellSize = Math.floor(
    (availableWidth - (gridState.gridCols - 1) * gridGap) / gridState.gridCols
  );

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 4,
      marginHorizontal: 16,
    },
    grid: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: availableWidth,
      alignSelf: 'center',
    },
  });

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.grid}>
        {gridState.cells.map((cell) => (
          <Cell
            key={cell.id}
            value={cell.value}
            isSelected={cell.isSelected}
            isLocked={cell.isLocked}
            isAnimating={isAnimatingSuccess && cell.isLocked}
            isShaking={isShaking && cell.isSelected}
            isSuccess={isAnimatingSuccess && cell.isLocked}
            isError={isAnimatingError && cell.isSelected}
            onPress={() => onCellPress(cell.row, cell.col)}
            cellSize={cellSize}
            testID={`cell-${cell.row}-${cell.col}`}
          />
        ))}
      </View>
    </View>
  );
};

export default Grid;
