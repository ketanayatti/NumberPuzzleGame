# Number Puzzle Game - React Native Proof of Concept

A highly-animated, robust proof-of-concept for a number summation puzzle game built with React Native, TypeScript, and advanced animation techniques using React Native Reanimated.

## 🎮 Features

### Core Gameplay

- **Interactive Grid System**: Fully scalable N×N grid (configurable at runtime)
- **Contiguous Selection**: Enforce horizontal/vertical adjacency for selected cells
- **Sum Validation**: Match selected cells to target sum
- **Progressive Removal**: Successfully matched cells are removed, allowing game progression

### Advanced Animations

- **Selection Feedback**: Smooth spring-based scaling and color transitions on cell selection
- **Success Animation**: Synchronized pop-and-vanish effect for matched cells
- **Error Feedback**: Immediate shake/wiggle animation for invalid selections
- **Visual Indicators**: Pulse effects for target display and status changes

### Architecture

- **Fully Modular Components**: Reusable, typed React components
- **Scalable Grid**: Support for any N×N puzzle size without code changes
- **TypeScript Throughout**: Full type safety and IDE support
- **Custom Hooks**: `useGrid` hook encapsulates all game logic
- **Separation of Concerns**: UI components, game logic, utilities, and types are cleanly separated

## 📱 Project Structure

```
src/
├── components/
│   ├── Cell.tsx           # Animated cell component with full animation support
│   ├── Grid.tsx           # Grid container component (scalable N×N)
│   ├── TargetDisplay.tsx  # Target sum display with visual feedback
│   ├── GameContainer.tsx  # Main game orchestrator
│   └── index.ts           # Component exports
├── hooks/
│   └── useGrid.ts         # Game state and logic hook
├── types/
│   └── index.ts           # TypeScript type definitions
├── utils/
│   ├── gridUtils.ts       # Grid generation, validation, and manipulation
│   └── animations.ts      # Animation configurations and utilities
└── context/               # (Prepared for future state management)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Expo CLI (optional, for running on physical device)

### Installation

```bash
# Navigate to project directory
cd NumberPuzzleGame

# Install dependencies (already done in setup)
npm install

# Install Reanimated for animations
npm install react-native-reanimated
```

### Running the Game

#### Web (Fastest for development)

```bash
npm run web
```

#### Android

```bash
npm run android
```

#### iOS (Requires macOS)

```bash
npm run ios
```

#### Using Expo Go App

```bash
npm start
# Scan QR code with Expo Go app on your phone
```

## 🎯 Core Components

### Cell Component

- **Location**: `src/components/Cell.tsx`
- **Props**: `value`, `isSelected`, `isLocked`, `isAnimating`, `isShaking`, `onPress`, `cellSize`
- **Animations**: Selection scaling, pop effect, shake/wiggle, color transitions

### Grid Component

- **Location**: `src/components/Grid.tsx`
- **Props**: `gridState`, `onCellPress`, `isShaking`, `isAnimatingSuccess`
- **Features**: Dynamically renders N×N grid, fully responsive

### TargetDisplay Component

- **Location**: `src/components/TargetDisplay.tsx`
- **Props**: `targetSum`, `currentSum`, `selectedCount`, `isMatching`
- **Features**: Real-time sum tracking, match indicator, pulse animations

### GameContainer Component

- **Location**: `src/components/GameContainer.tsx`
- **Features**: Orchestrates all components, manages game flow, provides UI controls

## 🎨 Animation System

### Animation Timings

- **Cell Selection**: 200ms (spring)
- **Cell Deselection**: 150ms (spring)
- **Match Success**: 600ms (pop and vanish)
- **Error Shake**: 400ms (wiggle sequence)
- **Cell Pulse**: 500ms (target display)

### Animation Types

#### Selection Animation

- **Trigger**: User taps cell
- **Effect**: Smooth scale-up (1 → 1.15), border highlight, shadow enhancement
- **Duration**: 200ms

#### Deselection Animation

- **Trigger**: User taps selected cell
- **Effect**: Smooth scale-down (1.15 → 1), border/shadow fade
- **Duration**: 150ms

#### Success Animation (Pop Effect)

- **Trigger**: Valid selection matches target sum
- **Effect**: Synchronized scale sequence (0.9 → 1.15 → 0.8 → 0) with fade
- **Duration**: 700ms
- **Cells Affected**: All matched cells simultaneously

#### Error Animation (Shake)

- **Trigger**: Invalid selection or failed validation
- **Effect**: Horizontal wiggle (±8px) with slight scale up (1 → 1.05)
- **Duration**: 400ms
- **Cells Affected**: All currently selected cells

#### Pulse Animation

- **Trigger**: Match found (target sum reached)
- **Effect**: Scale pulse (1 → 1.2 → 1)
- **Duration**: 500ms
- **Affected Element**: Target display component

## 🧮 Game Logic

### Grid Generation (`gridUtils.ts`)

- `generateGrid(gridSize, maxNumber)`: Creates random grid
- `generateTargetSum(cells, minSelection, maxSelection)`: Creates achievable target
- `isValidSelection()`: Validates contiguity and lock status
- `validateSelection()`: Checks if current selection matches target
- `lockSelectedCells()`: Marks cells as completed
- `removeLockedCells()`: Removes matched cells and applies gravity

### State Management (`useGrid.ts`)

- `selectCell(row, col)`: Add cell to selection
- `deselectCell(row, col)`: Remove cell from selection
- `validateAndLock()`: Check match and animate
- `resetSelection()`: Clear current selection
- `resetGrid()`: New puzzle
- `skipPuzzle()`: Skip to next puzzle

## 📊 Grid Scalability

The game supports any N×N grid size. To change grid size:

**In `App.tsx`:**

```tsx
<GameContainer gridSize={4} /> // Change 4 to any size
```

The Grid component automatically:

- Calculates responsive cell sizes
- Maintains proper spacing
- Handles layout wrapping
- Preserves animations at all sizes

## 🎮 User Interactions

### Selection Rules

1. **First Selection**: Can select any cell
2. **Subsequent Selections**: Must be adjacent (horizontal/vertical) to last selected
3. **Deselection**: Tap selected cell again to remove
4. **Locked Cells**: Cannot be selected (already completed)

### Controls

- **VALIDATE**: Check if selection sum matches target
- **CLEAR**: Remove all selections
- **SKIP**: Generate new puzzle
- **RESET**: Return to initial state

## 🔧 Type Safety

Full TypeScript support with comprehensive types:

```typescript
interface Cell extends CellPosition {
  id: string;
  value: number;
  isSelected: boolean;
  isLocked: boolean;
}

interface GridState {
  cells: Cell[];
  gridSize: number;
  targetSum: number;
  selectedCells: CellPosition[];
  lockedCells: CellPosition[];
  currentSum: number;
  isValidating: boolean;
  matchFound: boolean;
  errorState: boolean;
}
```

## 🎯 Development Notes

### Animation Performance

- Uses React Native Reanimated 3 for GPU-accelerated animations
- All animations run on native thread (not JavaScript)
- Optimized for 60 FPS performance
- Tested on low-end and high-end devices

### Testing

The components include `testID` props for easy testing:

```tsx
<Grid gridState={gridState} onCellPress={handleCellPress} testID="game-grid" />
<Cell value={5} isSelected={false} ... testID="cell-0-0" />
```

### Future Enhancements

- **Difficulty Levels**: Adjust grid size, number ranges, time limits
- **Score Tracking**: Points for efficiency, speed bonuses
- **Leaderboards**: Local and cloud-based rankings
- **Power-ups**: Special abilities (hints, freeze cells, etc.)
- **Sound Effects**: Audio feedback for actions
- **Haptic Feedback**: Vibration on selection
- **Multiplayer**: Competitive or cooperative modes

## 📋 Sprint Deliverables

✅ **Core Loop**: Functional grid with contiguous selection
✅ **Validation & State**: Cell removal and game progression
✅ **Modular Design**: Fully typed, reusable components
✅ **Scalability**: N×N grid without code changes
✅ **Animations**: Selection, success, and error feedback
✅ **Polish**: Comprehensive UI with stats and controls

## 🚀 Deployment

### Web

```bash
npm run web
# App runs in browser at http://localhost:8081
```

### Mobile (APK/IPA)

```bash
# Requires Expo account and EAS CLI
eas build --platform android
eas build --platform ios
```

## 📝 License

MIT License - Use freely in projects

## 🤝 Contributing

This is a proof-of-concept. For improvements:

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

---

**Built with ❤️ using React Native, TypeScript, and React Native Reanimated**
