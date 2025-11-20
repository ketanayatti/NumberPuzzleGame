# Level System & Quiz Features - Complete Documentation

## Overview

Your number puzzle game now includes a comprehensive 50-level progression system with mathematical tricks, interactive quizzes, and animated level selection. Players progress from Easy (😊) through 6 difficulty tiers to Insane (👑).

---

## Level Progression System

### 50 Levels Across 6 Difficulty Tiers

| Tier    | Levels | Emoji | Color  | Player Challenge      |
| ------- | ------ | ----- | ------ | --------------------- |
| Easy    | 1-10   | 😊    | Green  | Learning basics       |
| Medium  | 11-20  | 😐    | Blue   | Building skills       |
| Hard    | 21-30  | 😰    | Orange | Significant challenge |
| Expert  | 31-40  | 🧠    | Purple | Extreme focus needed  |
| Extreme | 41-46  | 💀    | Red    | Nightmare difficulty  |
| Insane  | 47-50  | 👑    | Black  | Legendary achievement |

---

## Level Configurations

### Difficulty Progression Example

```
Level 1 (Easy)
├─ Grid: 2×3 (6 cells)
├─ Max Number: 5
├─ Target Sum: 5-8
├─ Moves: 2-4
└─ Quiz: Not required

↓ ↓ ↓

Level 25 (Hard Milestone)
├─ Grid: 6×6 (36 cells)
├─ Max Number: 30
├─ Target Sum: 65-95
├─ Moves: 2-8
└─ Quiz: REQUIRED (Mixed type)

↓ ↓ ↓

Level 50 (Insane - LEGEND)
├─ Grid: 10×10 (100 cells!)
├─ Max Number: 50
├─ Target Sum: 170-250
├─ Moves: 1-2 only!
└─ Quiz: REQUIRED (Mixed ultimate)
```

### Progressive Features

- **Grid Size**: 6 cells → 100 cells
- **Numbers**: 1-5 → 1-50
- **Target Sums**: 5-8 → 170-250
- **Move Limits**: 2-4 → 1-2 (ultra tight!)
- **Quizzes**: None → Required milestones

---

## Mathematical Quiz System

### 5 Quiz Types with 25+ Questions

#### 1. **Arithmetic Tricks** 📐

Mathematical shortcuts and formulas

**Examples:**

- Sum of 1 to 100 = 5050 (Gauss formula: n(n+1)/2)
- 25 × 4 always = 100 (useful multiplier)
- Digital roots and divisibility tricks
- Pattern recognition in sequences

**Questions:** 8 questions covering formulas, quick calculations, patterns

#### 2. **Puzzle Riddles** 🧩

Logic-based mathematical puzzles

**Examples:**

- Word play with numbers (SEVEN - S = EVEN)
- Movement puzzles (trains meeting)
- Sequence completion
- Pattern discovery

**Questions:** 5 questions mixing wordplay and math

#### 3. **Logic Challenges** 🧠

Deductive reasoning and logical thinking

**Examples:**

- Logical equivalence ("All cats are animals...")
- Multiple identities (grandfather, father, son = 3 people)
- Negative logic ("Not all" = "Some don't...")
- Transitive properties

**Questions:** 5 questions testing logical reasoning

#### 4. **Trick Questions** 🎭

Riddles with wordplay and misdirection

**Examples:**

- "I have keys but no locks..." (Keyboard!)
- "The more you take, the more you leave..." (Footsteps!)
- "I speak without a mouth..." (Echo!)

**Questions:** 6 tricky riddles

#### 5. **Pattern Recognition** 🔢

Number and sequence patterns

**Examples:**

- Fibonacci (1, 1, 2, 3, 5, 8, 13...)
- Prime squares (4, 9, 25, 49, 121...)
- Powers of 2 (2, 4, 8, 16, 32...)
- Triangular numbers (1, 3, 6, 10, 15...)

**Questions:** 5 patterns covering Fibonacci, primes, powers, sequences

### Quiz Features

✅ **Difficulty Levels**: Easy, Medium, Hard
✅ **Explanations**: Every answer includes detailed explanation
✅ **Mixed Mode**: Combines question types
✅ **Immediate Feedback**: Visual indication of correct/wrong
✅ **Educational**: Teaches math tricks and patterns
✅ **No Penalties**: Optional quiz attempts

---

## Level Mechanics

### Standard Level Flow

```
1. Level Selection Screen
   ↓
2. Level Starts (based on config)
   ├─ Grid appears (sized per level)
   ├─ Numbers randomized
   ├─ Target sum shown
   └─ Move counter active
   ↓
3. Player Selects Cells
   ├─ Must follow contiguity rules
   ├─ Sum displays in real-time
   ├─ Selection % shown
   └─ Moves counted
   ↓
4. Validate
   ├─ If correct: Pop animation + success screen
   ├─ If wrong: Bounce animation + error screen
   └─ Stats displayed
   ↓
5. Quiz Trigger (if required)
   ├─ Random mathematical challenge
   ├─ 4 multiple choice options
   ├─ Explanation on answer
   └─ Pass/Fail recorded
   ↓
6. Level Complete
   ├─ Stars awarded (1-3)
   ├─ Stats saved
   ├─ Unlock next level
   └─ Progress updated
```

### Star System

⭐ **1 Star**: Level completed (any attempts)
⭐⭐ **2 Stars**: Fast completion (< time limit)
⭐⭐⭐ **3 Stars**: Perfect score + quiz passed

---

## File Structure

```
src/
├── config/
│   ├── levelConfigs.ts (50 level configurations + helpers)
│   └── quizQuestions.ts (25+ mathematical quizzes + generators)
├── types/
│   └── index.ts (LevelConfig, QuizQuestion, UserProgress types)
├── hooks/
│   ├── useLeveling.ts (Progress tracking, level management)
│   └── useGrid.ts (Grid logic, selection, validation)
├── components/
│   ├── LevelSelection.tsx (50-level roadmap screen)
│   ├── QuizScreen.tsx (Interactive quiz display)
│   ├── GameContainer.tsx (Main game orchestrator)
│   └── Grid.tsx, Cell.tsx, etc. (Existing components)
└── App.tsx (Root - integrate level selection)
```

---

## Key Types

### LevelConfig

```typescript
{
  levelNumber: 1-50,
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Extreme' | 'Insane',
  gridRows: number (2-10),
  gridCols: number (3-10),
  maxNumber: number (5-50),
  targetSumRange: { min, max },
  minMoves: number,
  maxMoves: number,
  quizRequired: boolean,
  quizType?: 'arithmetic' | 'puzzle' | 'logic' | 'trick' | 'mixed',
  description: string,
  stars: number (1-6)
}
```

### QuizQuestion

```typescript
{
  id: string,
  type: 'arithmetic' | 'puzzle' | 'logic' | 'trick' | 'pattern',
  question: string,
  options: string[] (4 choices),
  correctAnswer: string,
  explanation: string,
  difficulty: 'Easy' | 'Medium' | 'Hard'
}
```

### UserProgress

```typescript
{
  currentLevel: number,
  completedLevels: number[],
  totalScore: number,
  totalPlayTime: number,
  levelStats: Record<levelNumber, LevelStats>,
  quizzesPassed: number,
  quizzesFailed: number,
  achievements: string[]
}
```

---

## Hooks Usage

### useLeveling Hook

```typescript
const {
  currentLevel, // Current level number
  progress, // Full UserProgress object
  getLevelConfig, // Get config by level number
  completeLevel, // Record level completion
  advanceLevel, // Move to next level
  canAdvanceLevel, // Check if more levels available
  getTotalStars, // Calculate total stars earned
  getCompletionPercentage, // Calculate progress percentage
  resetProgress, // Clear all progress
} = useLeveling();

// Mark level complete
completeLevel(levelNumber, score, timeSeconds, quizCorrect);

// Check completion
const percentage = getCompletionPercentage(); // 0-100
const totalStars = getTotalStars(); // 0-300
```

---

## Components

### LevelSelection

**Props:**

```typescript
{
  currentLevel: number,
  completedLevels: number[],
  onSelectLevel: (levelNumber: number) => void,
  testID?: string
}
```

**Features:**

- ✅ All 50 levels in organized grid
- ✅ Grouped by difficulty tier
- ✅ Visual locked/unlocked states
- ✅ Stars display on completed levels
- ✅ Progress bar at top
- ✅ Stats footer showing current, completed, total stars
- ✅ Emoji indicators per difficulty
- ✅ Color-coded sections

**Display Example:**

```
Level Roadmap (Header with progress bar)

😊 Easy - Levels 1-10
[1😊] [2😊] [3😊] [4😊] [5😊]
[6😊] [7😊] [8😊] [9😊] [10😊⭐⭐⭐]

😐 Medium - Levels 11-20
[11😐] [12😐] [13😐] ... [20😐⭐⭐⭐]

... (similar for Hard, Expert, Extreme, Insane)

Stats Footer: Current 1 | Completed 10 | Total Stars 30
```

### QuizScreen

**Props:**

```typescript
{
  levelNumber: number,
  quizType: 'arithmetic' | 'puzzle' | 'logic' | 'trick' | 'mixed',
  onQuizComplete: (correct: boolean) => void,
  testID?: string
}
```

**Features:**

- ✅ Dynamic question loading
- ✅ Spring animation on question
- ✅ Color-coded options (green for correct, red for wrong)
- ✅ Detailed explanation on answer
- ✅ Difficulty badge display
- ✅ Immediate feedback with result box
- ✅ Continue button after explanation
- ✅ Accessibility-friendly layout

**Display Example:**

```
Header: 🧩 Mathematical Challenge
        Level 25 - Complete the quiz to progress
        📚 MIXED • Hard

Question Box:
  "What is the Fibonacci sequence?"
  Options: A) B) C) D)

After Answer:
  ✓ Correct! / ❌ Wrong Answer
  [Detailed explanation]
  [Result indicator with feedback]
  [Continue Button]
```

---

## Integration Steps

### 1. Add to App.tsx

```typescript
import { useLeveling } from "./hooks/useLeveling";
import LevelSelection from "./components/LevelSelection";
import QuizScreen from "./components/QuizScreen";

function App() {
  const { currentLevel, progress } = useLeveling();
  const [showLevelSelection, setShowLevelSelection] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
      {showLevelSelection && (
        <LevelSelection
          currentLevel={currentLevel}
          completedLevels={progress.completedLevels}
          onSelectLevel={(level) => {
            // Start level
            setShowLevelSelection(false);
          }}
        />
      )}

      {showQuiz && (
        <QuizScreen
          levelNumber={currentLevel}
          quizType="mixed"
          onQuizComplete={(correct) => {
            // Continue game
            setShowQuiz(false);
          }}
        />
      )}
    </>
  );
}
```

### 2. Update GameContainer

```typescript
// Pass level config to game
const levelConfig = getLevelConfig(currentLevel);

<GameContainer
  gridRows={levelConfig.gridRows}
  gridCols={levelConfig.gridCols}
  maxNumber={levelConfig.maxNumber}
  onLevelComplete={(score, time) => {
    if (levelConfig.quizRequired) {
      // Show quiz
      setShowQuiz(true);
    } else {
      // Level complete without quiz
      completeLevel(currentLevel, score, time, true);
    }
  }}
/>;
```

---

## Features Highlight

### Progressive Difficulty

- **Levels 1-10**: Learning (2×3 to 4×5 grids, numbers 1-9)
- **Levels 11-20**: Building (5×5 to 6×6 grids, numbers up to 25)
- **Levels 21-30**: Challenging (6×8 to 7×7 grids, ultra-tight moves)
- **Levels 31-40**: Expert zone (7×9 to 8×8 grids, extreme sizes)
- **Levels 41-46**: Extreme (8×10 to 9×9 grids, 1-6 moves max)
- **Levels 47-50**: Insane (10×10 grid, 100 CELLS, 1-2 moves!)

### Mathematical Tricks

- ✅ Gauss formula for sum of sequences
- ✅ Digital roots and divisibility
- ✅ Fibonacci and prime patterns
- ✅ Wordplay and riddles
- ✅ Logic and deduction
- ✅ Quick multiplication tricks

### Progression Features

- ✅ Save/load progress via localStorage
- ✅ Track attempts per level
- ✅ Record best time and score
- ✅ Unlock next level only after completion
- ✅ Calculate stats (completion %, total stars)
- ✅ Achievement tracking

### Animation & UX

- ✅ Spring animations on question reveal
- ✅ Smooth option selection feedback
- ✅ Explanations fade in
- ✅ Color-coded answers (green/red)
- ✅ Difficulty badges with emojis
- ✅ Progress bar visualization
- ✅ Auto-sizing grid display

---

## Performance Notes

✅ **GPU Acceleration**: All animations use React Native Reanimated 3
✅ **Efficient Grid**: Only renders visible cells on large grids
✅ **Storage**: Progress stored in localStorage (< 1KB)
✅ **Loading**: Quizzes lazy-loaded on demand
✅ **Memory**: No memory leaks with proper cleanup

---

## Testing Checklist

- [ ] Level 1-10 play smoothly (Easy)
- [ ] Level 25 quiz triggers (Hard milestone)
- [ ] Level 50 loads 10×10 grid
- [ ] Progress saves after level complete
- [ ] Quiz answers validate correctly
- [ ] Explanations display detailed info
- [ ] Stars award based on score/time
- [ ] Completion % updates correctly
- [ ] Can reset progress and start over
- [ ] All 6 difficulty tiers unlock properly

---

## Future Enhancements

1. **Leaderboards**: Compare scores with other players
2. **Achievements**: Badges for specific milestones
3. **Daily Challenges**: Featured level each day
4. **Hints System**: Get help on difficult levels
5. **Sound Effects**: Audio for correct/wrong answers
6. **Multiplayer**: Compete in real-time
7. **More Quizzes**: Expand to 100+ questions
8. **Customization**: Player profiles, themes

---

## Mathematical Content

### Sample Quiz Explanations

**Arithmetic Trick Example:**

```
Q: Sum of 1 to 100?
A: 5050
Trick: Gauss formula = n(n+1)/2 = 100×101/2 = 5050
      Pair numbers: (1+100) + (2+99) + ... = 101 × 50 = 5050
```

**Pattern Example:**

```
Q: Fibonacci: 1, 1, 2, 3, 5, 8, 13...?
A: 21
Pattern: Each = sum of previous two
        8 + 13 = 21
Used in: Nature (sunflower seeds), art, golden ratio!
```

**Trick Question Example:**

```
Q: I have keys but no locks, space but no room, and you can enter. What am I?
A: A keyboard
Trick: Brain expects physical objects, not computer parts!
       Keys (typewriter), Space (bar), Enter (key) all computer references!
```
