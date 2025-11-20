/**
 * Grid utility functions for game logic
 * REBUILT: Accurate grid generation and validation
 */

import { Cell, CellPosition, GridState } from '../types';

interface PuzzleConfig {
  cells: Cell[];
  targetSum: number;
  requiredSelectionCount: number;
}

/**
 * Generates a complete puzzle with grid, target sum, and required selection count
 * @param rows - Number of rows
 * @param cols - Number of columns
 * @returns Puzzle configuration
 */
export const generatePuzzle = (rows: number, cols: number): PuzzleConfig => {
  const cells: Cell[] = [];
  const totalCells = rows * cols;
  
  // 1. Determine game rules for this round
  // Randomly choose required selection count between 3 and 6
  const requiredSelectionCount = Math.floor(Math.random() * 4) + 3; // 3, 4, 5, or 6
  
  // 2. Generate a valid solution first
  const solutionNumbers: number[] = [];
  let currentSum = 0;
  
  // Generate numbers for the solution
  // We want a reasonable target sum, so we'll pick numbers between 1 and 15
  for (let i = 0; i < requiredSelectionCount; i++) {
    const val = Math.floor(Math.random() * 15) + 1;
    solutionNumbers.push(val);
    currentSum += val;
  }
  
  const targetSum = currentSum;
  
  // 3. Fill the rest of the grid with random numbers
  const allNumbers = [...solutionNumbers];
  while (allNumbers.length < totalCells) {
    allNumbers.push(Math.floor(Math.random() * 15) + 1);
  }
  
  // 4. Shuffle the numbers
  for (let i = allNumbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
  }

  // 5. Create cell objects
  let cellId = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push({
        id: `cell-${row}-${col}`,
        row,
        col,
        value: allNumbers[cellId],
        isSelected: false,
        isLocked: false,
      });
      cellId++;
    }
  }

  return {
    cells,
    targetSum,
    requiredSelectionCount,
  };
};

/**
 * Generates initial grid with random numbers (no duplicates within grid)
 * @deprecated Use generatePuzzle instead
 */
export const generateGrid = (rows: number, cols: number, maxNumber: number = 9): Cell[] => {
  return generatePuzzle(rows, cols).cells;
};

/**
 * Finds a cell at a specific position
 */
export const getCellAtPosition = (
  cells: Cell[],
  row: number,
  col: number
): Cell | undefined => {
  return cells.find((cell) => cell.row === row && cell.col === col);
};

/**
 * Validates if a cell can be selected
 * Rules:
 * 1. Max selections based on required count
 * 2. Can deselect by clicking again
 * 3. Any cell can be selected (no adjacency required)
 */
export const isValidSelection = (
  cellPosition: CellPosition,
  selectedPositions: CellPosition[],
  lockedPositions: CellPosition[],
  requiredCount: number
): boolean => {
  // Can click same cell to deselect
  if (selectedPositions.some((pos) => pos.row === cellPosition.row && pos.col === cellPosition.col)) {
    return true;
  }

  // Max selections check
  if (selectedPositions.length >= requiredCount) {
    return false;
  }

  return true;
};

/**
 * Calculates the sum of selected cells
 */
export const calculateSelectionSum = (cells: Cell[], selectedPositions: CellPosition[]): number => {
  return selectedPositions.reduce((sum, pos) => {
    const cell = getCellAtPosition(cells, pos.row, pos.col);
    return sum + (cell?.value || 0);
  }, 0);
};

/**
 * Validates if selection matches the target sum
 * Requirements:
 * 1. Exact number of cells selected
 * 2. Sum must equal target
 */
export const validateSelection = (
  cells: Cell[],
  selectedPositions: CellPosition[],
  targetSum: number,
  requiredCount: number
): boolean => {
  if (selectedPositions.length !== requiredCount) {
    return false;
  }
  const currentSum = calculateSelectionSum(cells, selectedPositions);
  console.log(`Selection validation: sum=${currentSum}, target=${targetSum}, match=${currentSum === targetSum}`);
  return currentSum === targetSum;
};

/**
 * DEBUG: Prints grid layout for debugging
 */
export const debugPrintGrid = (cells: Cell[], rows: number, cols: number): void => {
  console.log(`\n=== GRID (${rows}x${cols}) ===`);
  for (let row = 0; row < rows; row++) {
    let rowStr = '';
    for (let col = 0; col < cols; col++) {
      const cell = getCellAtPosition(cells, row, col);
      rowStr += `[${cell?.value || '?'}] `;
    }
    console.log(rowStr);
  }
  console.log('=================\n');
};
