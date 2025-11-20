/**
 * Custom hook for managing grid state and game logic
 * REBUILT: Accurate state management and validation
 */

import { useCallback, useEffect, useState } from 'react';
import { Cell, CellPosition, GridState } from '../types';
import {
  generatePuzzle,
  validateSelection,
  calculateSelectionSum,
  isValidSelection,
  getCellAtPosition,
  debugPrintGrid,
} from '../utils/gridUtils';

interface UseGridReturn {
  gridState: GridState;
  selectCell: (row: number, col: number) => void;
  deselectCell: (row: number, col: number) => void;
  validateAndLock: () => boolean;
  resetSelection: () => void;
  resetGrid: () => void;
  skipPuzzle: () => void;
}

export const useGrid = (gridRows: number = 4, gridCols: number = 5): UseGridReturn => {
  const [gridState, setGridState] = useState<GridState>(() => {
    const puzzle = generatePuzzle(gridRows, gridCols);
    
    console.log(`✅ Grid initialized: ${gridRows}x${gridCols}`);
    debugPrintGrid(puzzle.cells, gridRows, gridCols);
    console.log(`📍 Target sum: ${puzzle.targetSum}, Required Count: ${puzzle.requiredSelectionCount}`);

    return {
      cells: puzzle.cells,
      gridSize: gridRows * gridCols,
      gridRows,
      gridCols,
      targetSum: puzzle.targetSum,
      requiredSelectionCount: puzzle.requiredSelectionCount,
      selectedCells: [],
      lockedCells: [],
      currentSum: 0,
      isValidating: false,
      matchFound: false,
      errorState: false,
    };
  });

  /**
   * Handle cell selection
   * Rules:
   * 1. Max selections based on required count
   * 2. Clicking same cell deselects it
   * 3. No adjacency required
   */
  const selectCell = useCallback(
    (row: number, col: number) => {
      const cellPos: CellPosition = { row, col };
      const cell = getCellAtPosition(gridState.cells, row, col);

      if (!cell) {
        console.warn(`⚠️ Cell not found at ${row},${col}`);
        return;
      }

      // Check if already selected (toggle off)
      const isCurrentlySelected = gridState.selectedCells.some(
        (pos) => pos.row === row && pos.col === col
      );

      if (isCurrentlySelected) {
        console.log(`🔄 Deselecting cell (${row},${col}) = ${cell.value}`);
        deselectCell(row, col);
        return;
      }

      // Validate new selection
      if (
        !isValidSelection(
          cellPos,
          gridState.selectedCells,
          gridState.lockedCells,
          gridState.requiredSelectionCount
        )
      ) {
        console.log(`❌ Invalid selection: Max ${gridState.requiredSelectionCount} cells allowed.`);
        // Trigger error animation
        setGridState((prev) => ({
          ...prev,
          errorState: true,
        }));

        // Reset error state after animation
        setTimeout(() => {
          setGridState((prev) => ({
            ...prev,
            errorState: false,
          }));
        }, 500);

        return;
      }

      // Update selected cells and calculate sum
      const newSelected = [...gridState.selectedCells, cellPos];
      const newSum = calculateSelectionSum(gridState.cells, newSelected);
      const updatedCells = gridState.cells.map((c) =>
        (c.row === row && c.col === col) ? { ...c, isSelected: true } : c
      );

      console.log(`✅ Selected cell (${row},${col}) = ${cell.value}, sum now = ${newSum}`);

      setGridState((prev) => ({
        ...prev,
        selectedCells: newSelected,
        currentSum: newSum,
        cells: updatedCells,
      }));
    },
    [gridState]
  );

  /**
   * Handle cell deselection
   */
  const deselectCell = useCallback((row: number, col: number) => {
    setGridState((prev) => {
      const newSelected = prev.selectedCells.filter(
        (pos) => !(pos.row === row && pos.col === col)
      );
      const newSum = calculateSelectionSum(prev.cells, newSelected);
      const updatedCells = prev.cells.map((c) =>
        (c.row === row && c.col === col) ? { ...c, isSelected: false } : c
      );

      console.log(`🔄 Deselected, new sum = ${newSum}`);

      return {
        ...prev,
        selectedCells: newSelected,
        currentSum: newSum,
        cells: updatedCells,
      };
    });
  }, []);

  /**
   * Validate selection
   */
  const validateAndLock = useCallback((): boolean => {
    const isValid = validateSelection(
      gridState.cells,
      gridState.selectedCells,
      gridState.targetSum,
      gridState.requiredSelectionCount
    );

    if (isValid) {
      console.log(`🎉 CORRECT! You found ${gridState.requiredSelectionCount} numbers summing to ${gridState.targetSum}!`);
      setGridState((prev) => ({
        ...prev,
        isValidating: true,
        matchFound: true,
      }));

      // Just show success, don't remove cells
      setTimeout(() => {
        setGridState((prev) => ({
          ...prev,
          isValidating: false,
          matchFound: false,
        }));
      }, 5000);

      return true;
    } else {
      console.log(`❌ WRONG! Sum=${gridState.currentSum}, Target=${gridState.targetSum}`);
      // Trigger error state
      setGridState((prev) => ({
        ...prev,
        errorState: true,
      }));

      setTimeout(() => {
        setGridState((prev) => ({
          ...prev,
          errorState: false,
        }));
      }, 500);

      return false;
    }
  }, [gridState]);

  /**
   * Clear current selection
   */
  const resetSelection = useCallback(() => {
    console.log(`🗑️ Clearing selection`);
    setGridState((prev) => ({
      ...prev,
      selectedCells: [],
      currentSum: 0,
      cells: prev.cells.map((c) => ({ ...c, isSelected: false })),
    }));
  }, []);

  /**
   * Reset entire grid
   */
  const resetGrid = useCallback(() => {
    console.log(`🔄 Resetting grid`);
    const puzzle = generatePuzzle(gridState.gridRows, gridState.gridCols);
    
    debugPrintGrid(puzzle.cells, gridState.gridRows, gridState.gridCols);

    setGridState({
      cells: puzzle.cells,
      gridSize: gridState.gridSize,
      gridRows: gridState.gridRows,
      gridCols: gridState.gridCols,
      targetSum: puzzle.targetSum,
      requiredSelectionCount: puzzle.requiredSelectionCount,
      selectedCells: [],
      lockedCells: [],
      currentSum: 0,
      isValidating: false,
      matchFound: false,
      errorState: false,
    });
  }, [gridState.gridSize, gridState.gridRows, gridState.gridCols]);

  /**
   * Skip current puzzle (Same as reset grid for now)
   */
  const skipPuzzle = useCallback(() => {
    resetGrid();
  }, [resetGrid]);

  return {
    gridState,
    selectCell,
    deselectCell,
    validateAndLock,
    resetSelection,
    resetGrid,
    skipPuzzle,
  };
};
