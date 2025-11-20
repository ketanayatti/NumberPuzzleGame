# Quick Start Guide - Number Puzzle Game

## 🚀 5-Minute Setup

### Step 1: Navigate to Project

```bash
cd d:\Professional\Internship\POC\NumberPuzzleGame\NumberPuzzleGame
```

### Step 2: Install Dependencies (If Needed)

```bash
npm install
npx expo install react-dom react-native-web
```

### Step 3: Start Development Server

```bash
npm run web
```

### Step 4: Open in Browser

- Automatically opens at `http://localhost:8081`
- Or manually navigate there

## 🎮 Playing the Game

### Game Flow

1. **View Target**: See the sum you need to reach at the top
2. **Select Cells**: Tap cells to select them (must be adjacent)
3. **Watch Sum**: See your current sum update in real-time
4. **Validate**: Press "VALIDATE" when you think sum matches target
5. **Success**: Matched cells pop and vanish, grid continues
6. **Repeat**: New puzzle appears automatically

### Controls

- **VALIDATE**: Check if current selection matches target sum
- **CLEAR**: Remove all selections without checking
- **SKIP**: Generate a new puzzle
- **RESET**: Start over completely

### Selection Rules

- ✅ First cell: Can select ANY cell
- ✅ Next cells: Must be adjacent (horizontal/vertical)
- ❌ Diagonal: NOT allowed
- ❌ Locked: Can't select completed cells
- ↩️ Toggle: Tap selected cell to deselect

## 🔧 Customization

### Change Grid Size

Edit `App.tsx`:

```tsx
<GameContainer gridSize={5} /> // Change 4 to any size
```

### Adjust Animation Speed

Edit `src/utils/animations.ts`:

```typescript
export const ANIMATION_TIMING = {
  CELL_SELECT: 200, // Change this value
  MATCH_SUCCESS: 600,
  // ... etc
};
```

### Change Colors

Edit `src/utils/animations.ts`:

```typescript
export const COLOR_ANIMATIONS = {
  SELECTED: "#FFD700", // Change gold color
  LOCKED: "#4ECDC4", // Change teal color
  // ... etc
};
```

## 📁 Key Files

| File                               | Purpose                   |
| ---------------------------------- | ------------------------- |
| `App.tsx`                          | Entry point, renders game |
| `src/components/Cell.tsx`          | Animated cell component   |
| `src/components/Grid.tsx`          | Grid layout               |
| `src/components/GameContainer.tsx` | Main logic                |
| `src/hooks/useGrid.ts`             | Game state management     |
| `src/utils/gridUtils.ts`           | Game logic functions      |

## 🎨 Animations Explained

### When You Select a Cell

- Cell smoothly scales up (1.0 → 1.15)
- Border highlights in orange
- Shadow gets stronger

### When Match is Found

- All matched cells "pop" simultaneously
- Scale: 0.9 → 1.15 → 0.8 → 0
- They fade out as they shrink
- Takes 700ms

### When Selection is Invalid

- Selected cells wiggle side-to-side
- Brief horizontal oscillation
- Scale pulse upward
- Takes 400ms

### When Sum Matches Target

- Target display pulses (1.0 → 1.2 → 1.0)
- Match badge appears with checkmark

## 📊 Grid Scalability

The game automatically adapts to grid size:

```
4×4 = 16 cells ✓ Fast, good for learning
5×5 = 25 cells ✓ Medium difficulty
6×6 = 36 cells ✓ Hard, more choices
10×10 = 100 cells ✓ Extreme, technical test
```

**No code changes needed** - just update the `gridSize` prop!

## 🧪 Testing Features

### Test Selection Logic

1. Tap a cell (should highlight)
2. Tap adjacent cell (should select)
3. Tap non-adjacent cell (should shake - error)

### Test Animations

1. Select multiple cells and validate (watch pop effect)
2. Make invalid selection (watch shake effect)
3. Watch target display pulse on match

### Test Grid Scaling

1. Change `gridSize` to 5 in `App.tsx`
2. Reload - grid should be 5×5
3. Try 6×6 - all cells fit on screen

## 📱 Running on Mobile

### Android Emulator

```bash
npm run android
```

### iOS Simulator (Mac only)

```bash
npm run ios
```

### Physical Device (Expo Go)

```bash
npm start
# Scan QR with Expo Go app
```

## 🐛 Troubleshooting

**Problem**: Screen goes blank

- **Solution**: Press `r` in terminal to reload

**Problem**: Animations are choppy

- **Solution**: Check device performance, try web version first

**Problem**: Grid doesn't appear

- **Solution**: Check browser console for errors

**Problem**: Cells don't respond to taps

- **Solution**: Try pressing `r` to reload, check for errors

## 💡 Pro Tips

1. **Strategy**: Look ahead to see which combinations are possible
2. **Speed**: Use the SKIP button if stuck
3. **Chains**: Create long selection chains for challenge
4. **Animation**: Watch the pop effect - it's satisfying!

## 📚 Learn More

- **Full Documentation**: See `DOCUMENTATION.md`
- **Component API**: Check individual component files
- **Game Logic**: Read `src/hooks/useGrid.ts`
- **Animations**: Explore `src/utils/animations.ts`

## 🎓 Code Structure

```
User Interaction
    ↓
GameContainer (orchestration)
    ↓
useGrid Hook (game state + logic)
    ↓
Grid → Cell components (UI)
    ↓
Animations (visual feedback)
```

## 🚀 Next Steps

1. **Play**: Try the game, understand mechanics
2. **Explore**: Check component code
3. **Customize**: Change colors, animations, grid size
4. **Extend**: Add new features (score, difficulty, etc.)

---

**Enjoy the game! 🎮**
