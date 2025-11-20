# Level System - Quick Setup Guide

## What's New? 🎮

Your number puzzle game now features:

✨ **50 Levels** - Easy (😊) to Insane (👑)
🧩 **25+ Quizzes** - Arithmetic tricks, patterns, logic puzzles, wordplay
📊 **Progression System** - Save progress, unlock levels, earn stars
🎨 **Animated UI** - Level selection roadmap, interactive quizzes
📈 **Difficulty Scaling** - 2×3 grid with numbers 1-5 → 10×10 grid with 100 cells!

---

## How to Use

### 1. Import the New Files

```typescript
import { useLeveling } from "./hooks/useLeveling";
import { getLevelConfig } from "./config/levelConfigs";
import LevelSelection from "./components/LevelSelection";
import QuizScreen from "./components/QuizScreen";
```

### 2. Add Level Management to Your App

```typescript
import React, { useState } from "react";
import { useLeveling } from "./hooks/useLeveling";
import LevelSelection from "./components/LevelSelection";
import GameContainer from "./components/GameContainer";
import QuizScreen from "./components/QuizScreen";

export default function App() {
  const { currentLevel, progress, completeLevel } = useLeveling();
  const [gameState, setGameState] = useState<"menu" | "playing" | "quiz">(
    "menu"
  );

  return (
    <>
      {gameState === "menu" && (
        <LevelSelection
          currentLevel={currentLevel}
          completedLevels={progress.completedLevels}
          onSelectLevel={(level) => {
            setGameState("playing");
          }}
        />
      )}

      {gameState === "playing" && (
        <GameContainer
          gridRows={getLevelConfig(currentLevel).gridRows}
          gridCols={getLevelConfig(currentLevel).gridCols}
          onLevelComplete={(score, time) => {
            if (getLevelConfig(currentLevel).quizRequired) {
              setGameState("quiz");
            } else {
              completeLevel(currentLevel, score, time, true);
              setGameState("menu");
            }
          }}
        />
      )}

      {gameState === "quiz" && (
        <QuizScreen
          levelNumber={currentLevel}
          quizType={getLevelConfig(currentLevel).quizType || "mixed"}
          onQuizComplete={(correct) => {
            completeLevel(currentLevel, 1000, 60, correct);
            setGameState("menu");
          }}
        />
      )}
    </>
  );
}
```

### 3. Level Details Accessible Anywhere

```typescript
import { getLevelConfig } from "./config/levelConfigs";

const config = getLevelConfig(currentLevel);

// Access level info
console.log(config.difficulty); // 'Easy', 'Medium', etc
console.log(config.gridRows); // 2-10
console.log(config.gridCols); // 3-10
console.log(config.maxNumber); // 5-50
console.log(config.targetSumRange); // {min, max}
console.log(config.quizRequired); // boolean
console.log(config.quizType); // 'arithmetic', etc
```

---

## Level Breakdown

### Easy Levels (1-10) 😊

- **Grid**: 2×3 → 5×4
- **Numbers**: 1-9
- **Moves**: 2-8
- **Focus**: Learn the game
- **Quiz**: Level 5 & 10 only

### Medium Levels (11-20) 😐

- **Grid**: 4×5 → 6×6
- **Numbers**: 15-25
- **Moves**: 3-10
- **Focus**: Build strategy
- **Quiz**: Levels 15 & 20

### Hard Levels (21-30) 😰

- **Grid**: 6×6 → 7×7
- **Numbers**: 25-30
- **Moves**: 2-10
- **Focus**: Tight constraints
- **Quiz**: Levels 25 & 30

### Expert Levels (31-40) 🧠

- **Grid**: 6×8 → 8×8
- **Numbers**: 30-40
- **Moves**: 1-8
- **Focus**: Ultra-challenging
- **Quiz**: Levels 35 & 40

### Extreme Levels (41-46) 💀

- **Grid**: 8×9 → 9×9
- **Numbers**: 40-45
- **Moves**: 1-7
- **Focus**: Nightmare difficulty
- **Quiz**: Level 46

### Insane Levels (47-50) 👑

- **Grid**: 10×10
- **Numbers**: 50
- **Moves**: 1-2 only!
- **Focus**: Legendary challenge
- **Quiz**: Level 50 (final quiz!)

---

## Quiz System

### Quiz Triggers

Quizzes appear at specific milestone levels:

- Level 5, 10 (Easy)
- Level 15, 20 (Medium)
- Level 25, 30 (Hard)
- Level 35, 40 (Expert)
- Level 46 (Extreme)
- Level 50 (Insane - Ultimate!)

### Quiz Types

```typescript
import { getRandomQuizzes, getMixedQuizzes } from "./config/quizQuestions";

// Get specific type
const arithmeticQuiz = getRandomQuizzes("arithmetic", 1);
const puzzleQuiz = getRandomQuizzes("puzzle", 1);
const logicQuiz = getRandomQuizzes("logic", 1);
const trickQuiz = getRandomQuizzes("trick", 1);

// Get mixed (all types combined)
const mixedQuiz = getMixedQuizzes(1);

// Get by difficulty
const easyQuiz = getQuizzesByDifficulty("Easy", 1);
const hardQuiz = getQuizzesByDifficulty("Hard", 1);
```

### Quiz Features

✅ **25+ Questions** across 5 types
✅ **Detailed Explanations** teaching math tricks
✅ **Multiple Choice** with 4 options
✅ **Difficulty Levels** Easy/Medium/Hard
✅ **Pass/Fail Recording** tracked in progress
✅ **Educational** - Learn while playing!

---

## Progress Tracking

### Save & Load Automatically

```typescript
import { useLeveling } from "./hooks/useLeveling";

const { progress } = useLeveling();

// Progress automatically saves to localStorage
console.log(progress.currentLevel); // Current level
console.log(progress.completedLevels); // Array of completed levels
console.log(progress.totalScore); // Total points earned
console.log(progress.totalPlayTime); // Total minutes played
console.log(progress.quizzesPassed); // Passed quizzes count
console.log(progress.quizzesFailed); // Failed quizzes count
console.log(progress.levelStats[25]); // Stats for specific level
```

### Record Level Completion

```typescript
const { completeLevel } = useLeveling();

// When player completes a level
completeLevel(
  levelNumber, // Which level (1-50)
  score, // Points earned
  timeSeconds, // Time taken
  quizCorrect // Did they pass quiz?
);

// Example
completeLevel(5, 2500, 45, true); // Level 5 done, passed quiz
```

### Get Statistics

```typescript
const { getTotalStars, getCompletionPercentage } = useLeveling();

const stars = getTotalStars(); // Total stars (0-150)
const percent = getCompletionPercentage(); // 0-100%
```

---

## Difficulty Helpers

```typescript
import { getDifficultyColor, getDifficultyEmoji } from "./config/levelConfigs";

// Get color for styling
const color = getDifficultyColor("Hard"); // '#FF9800' (Orange)
const color = getDifficultyColor("Expert"); // '#9C27B0' (Purple)

// Get emoji for UI
const emoji = getDifficultyEmoji("Easy"); // '😊'
const emoji = getDifficultyEmoji("Insane"); // '👑'
```

---

## Configuration Reference

### Level Config Properties

```typescript
{
  levelNumber: 1,                    // 1-50
  difficulty: 'Easy',                // Tier name
  gridRows: 2,                       // 2-10
  gridCols: 3,                       // 3-10
  maxNumber: 5,                      // 5-50
  targetSumRange: { min: 5, max: 8 }, // Target bounds
  minMoves: 2,                       // Minimum cells
  maxMoves: 4,                       // Maximum cells
  quizRequired: false,               // Quiz at end?
  quizType: 'arithmetic',            // Quiz type
  description: 'Welcome! Select 2-3 cells to reach target sum',
  stars: 1,                          // Max stars possible
}
```

### Quiz Question Properties

```typescript
{
  id: 'arithmetic-1',
  type: 'arithmetic',                // Question type
  question: 'Sum of 1-10?',
  options: ['45', '50', '55', '60'],
  correctAnswer: '55',
  explanation: 'Formula: n(n+1)/2...',
  difficulty: 'Medium',              // Easy/Medium/Hard
}
```

---

## Files Created

```
src/
├── config/
│   ├── levelConfigs.ts (NEW)        ← 50 level configurations
│   └── quizQuestions.ts (NEW)       ← 25+ math quizzes
├── types/
│   └── index.ts (UPDATED)           ← Added level types
├── hooks/
│   └── useLeveling.ts (NEW)         ← Progress management
├── components/
│   ├── LevelSelection.tsx (NEW)     ← Level roadmap
│   ├── QuizScreen.tsx (NEW)         ← Quiz display
│   ├── GameContainer.tsx            ← (existing, integrate levels)
│   └── ...
└── App.tsx (NEEDS UPDATE)           ← Add level state
```

---

## Testing the System

### 1. View Level Selection

```typescript
<LevelSelection
  currentLevel={1}
  completedLevels={[1, 2, 3, 4, 5]}
  onSelectLevel={(level) => console.log(`Selected level ${level}`)}
/>
```

**Should show:**

- ✅ All 50 levels organized by difficulty
- ✅ Green/blue/orange/purple/red/black sections
- ✅ Locked levels (grayed out)
- ✅ Completed levels with stars
- ✅ Progress bar at top
- ✅ Stats at bottom

### 2. Test a Quiz

```typescript
<QuizScreen
  levelNumber={25}
  quizType="mixed"
  onQuizComplete={(correct) => {
    console.log(correct ? "Passed!" : "Failed!");
  }}
/>
```

**Should show:**

- ✅ Random math question
- ✅ 4 multiple choice options
- ✅ Explanation after answer
- ✅ Result indicator (green/red)
- ✅ Continue button

### 3. Track Progress

```typescript
const { progress, completeLevel } = useLeveling();

// Complete a level
completeLevel(5, 2000, 90, true);

// Check saved
console.log(progress.completedLevels); // Should include 5
console.log(progress.quizzesPassed); // Should be 1
```

---

## Live Example Usage

```typescript
import React, { useState } from "react";
import { useLeveling } from "./hooks/useLeveling";
import { getLevelConfig } from "./config/levelConfigs";
import LevelSelection from "./components/LevelSelection";
import QuizScreen from "./components/QuizScreen";

export default function GameApp() {
  const { currentLevel, progress, completeLevel } = useLeveling();
  const [showQuiz, setShowQuiz] = useState(false);

  const levelConfig = getLevelConfig(currentLevel);

  const handleLevelComplete = () => {
    const config = getLevelConfig(currentLevel);
    if (config.quizRequired) {
      setShowQuiz(true);
    } else {
      completeLevel(currentLevel, 2000, 60, true);
    }
  };

  return (
    <>
      {!showQuiz && (
        <LevelSelection
          currentLevel={currentLevel}
          completedLevels={progress.completedLevels}
          onSelectLevel={(level) => console.log(`Playing level ${level}`)}
        />
      )}

      {showQuiz && (
        <QuizScreen
          levelNumber={currentLevel}
          quizType={levelConfig.quizType || "mixed"}
          onQuizComplete={(correct) => {
            completeLevel(currentLevel, 2000, 60, correct);
            setShowQuiz(false);
          }}
        />
      )}
    </>
  );
}
```

---

## Performance Tips

✅ Quizzes load lazily (only when needed)
✅ Levels render efficiently in grid
✅ Progress saves automatically
✅ All animations GPU-accelerated
✅ No memory leaks with proper cleanup

---

## Next Steps

1. ✅ Import new components in your App.tsx
2. ✅ Set up level state management
3. ✅ Test level selection screen
4. ✅ Test quiz functionality
5. ✅ Integrate with GameContainer
6. ✅ Test full progression flow
7. 📱 Deploy and enjoy 50 levels of puzzling!

---

**Happy Puzzling! 🎮✨**
