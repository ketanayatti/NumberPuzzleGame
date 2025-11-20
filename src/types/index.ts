/**
 * Core type definitions for the Number Puzzle Game
 */

export interface CellPosition {
  row: number;
  col: number;
}

export interface Cell extends CellPosition {
  id: string;
  value: number;
  isSelected: boolean;
  isLocked: boolean;
}

export interface GridState {
  cells: Cell[];
  gridSize: number;
  gridRows: number;
  gridCols: number;
  targetSum: number;
  requiredSelectionCount: number; // Added for dynamic selection count
  selectedCells: CellPosition[];
  lockedCells: CellPosition[];
  currentSum: number;
  isValidating: boolean;
  matchFound: boolean;
  errorState: boolean;
}

export interface AnimationState {
  cellAnimations: Record<string, CellAnimationState>;
  gridAnimations: GridAnimationState;
}

export interface CellAnimationState {
  scale: number;
  opacity: number;
  backgroundColor: string;
}

export interface GridAnimationState {
  shake: number;
  pulse: number;
}

export interface GameState {
  grid: GridState;
  animations: AnimationState;
  score: number;
  movesCount: number;
  gameStatus: 'playing' | 'won' | 'lost' | 'paused';
}

// ===== LEVEL & PROGRESSION SYSTEM =====
export interface LevelConfig {
  levelNumber: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Extreme' | 'Insane';
  gridRows: number;
  gridCols: number;
  maxNumber: number;
  timeLimit?: number; // in seconds, optional
  targetSumRange: { min: number; max: number };
  minMoves: number;
  maxMoves: number;
  quizRequired: boolean;
  quizType?: 'arithmetic' | 'puzzle' | 'logic' | 'trick' | 'mixed';
  description: string;
  stars: number; // 0-3 stars
}

export interface QuizQuestion {
  id: string;
  type: 'arithmetic' | 'puzzle' | 'logic' | 'trick' | 'pattern';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface UserProgress {
  currentLevel: number;
  completedLevels: number[];
  totalScore: number;
  totalPlayTime: number;
  levelStats: Record<number, LevelStats>;
  quizzesPassed: number;
  quizzesFailed: number;
  achievements: string[];
}

export interface LevelStats {
  levelNumber: number;
  attempts: number;
  completed: boolean;
  bestScore: number;
  bestTime: number;
  starsEarned: number;
  quizPassed: boolean;
}

export interface GameSession {
  level: number;
  startTime: Date;
  moves: number;
  score: number;
  quizAnswered: boolean;
  quizCorrect: boolean;
}
