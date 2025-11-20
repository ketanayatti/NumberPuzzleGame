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
  // Limit width for web/tablet to prevent giant cells
  const maxContentWidth = 360; 
  const effectiveWidth = Math.min(screenWidth, maxContentWidth);

  const padding = 12;
  const availableWidth = effectiveWidth - padding * 2;
  // Cell has margin 4 on all sides, so 8px horizontal space per cell
  const cellMarginHorizontal = 8; 
  
  const cellSize = Math.floor(
    (availableWidth / gridState.gridCols) - cellMarginHorizontal
  );

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 4,
      marginHorizontal: 16,
      width: '100%',
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
