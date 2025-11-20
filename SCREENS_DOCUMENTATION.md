# Action Screens Documentation

## Overview

The game now features full-screen animated feedback for all major actions:

- **VALIDATE**: Success/error screens with statistics
- **CLEAR**: Selection cleared confirmation
- **RESET**: Game reset confirmation
- **SKIP**: Puzzle skipped confirmation

---

## 1. ActionStatusScreen Component

### Purpose

Displays full-screen animated feedback with icon, title, subtitle, and action-specific statistics.

### Props

```typescript
interface ActionStatusScreenProps {
  visible: boolean; // Show/hide screen
  action: "validate" | "clear" | "reset" | "skip";
  isSuccess?: boolean; // For validate: true=success, false=error
  targetSum?: number; // For validate: target value
  selectedSum?: number; // For validate: user's selection sum
  selectedCount?: number; // For validate: cells selected
  testID?: string;
}
```

### Visual Design

#### **Success Validation** (Green #4CAF50)

```
┌─────────────────────┐
│         ✓           │  Icon: 64px, bold
│      CORRECT!       │  Title: 48px, bold
│  Excellent Match!   │  Subtitle: 20px
│                     │
│  Target: 15         │  Statistics section
│  Your Sum: 15       │  (200ms delay animation)
│  Cells Selected: 3  │
└─────────────────────┘
```

#### **Error Validation** (Red #FF6B6B)

```
┌─────────────────────┐
│         ✗           │
│     INCORRECT       │
│      Try Again      │
│                     │
│  Target: 15         │
│  Your Sum: 18       │
│  Cells Selected: 4  │
└─────────────────────┘
```

#### **Clear Selection** (Blue #2196F3)

```
┌─────────────────────┐
│         ↻           │
│      CLEARED        │
│   Selection Reset   │
│                     │
│ Ready for new       │
│  selection          │
└─────────────────────┘
```

#### **Game Reset** (Orange #FF9800)

```
┌─────────────────────┐
│         ⟲           │
│       RESET         │
│   New Game Started  │
│                     │
│  All cells shuffled │
└─────────────────────┘
```

#### **Puzzle Skip** (Purple #9C27B0)

```
┌─────────────────────┐
│         ⊘           │
│      SKIPPED        │
│   Moving to Next    │
│                     │
│ Loading new puzzle  │
└─────────────────────┘
```

### Animation Timing

1. **Show**: Icon springs in (200ms), text fades in (400ms), stats fade in (500ms)
2. **Display**: 2-3 seconds auto-close (exact timing depends on action context)
3. **Hide**: All elements fade out (200ms)

### Integration in GameContainer

```typescript
// Validation screen
<ActionStatusScreen
  visible={showValidationScreen}
  action="validate"
  isSuccess={validationIsSuccess}
  targetSum={lastTargetSum}
  selectedSum={lastSelectedSum}
  selectedCount={lastSelectedCount}
/>

// Clear screen
<ActionStatusScreen
  visible={showClearedScreen}
  action="clear"
/>

// Reset screen
<ActionStatusScreen
  visible={showResetScreen}
  action="reset"
/>

// Skip screen
<ActionStatusScreen
  visible={showSkippedScreen}
  action="skip"
/>
```

---

## 2. ResultModal Component

### Purpose

Alternative modal-style feedback (currently in codebase but not actively used - can be switched to for smaller screens/tablets).

### Props

```typescript
interface ResultModalProps {
  visible: boolean;
  type: "success" | "error" | "cleared" | "reset" | "skipped";
  message: string;
  description?: string;
  testID?: string;
}
```

### Visual Style

- Background: Colored overlay with modal in center
- Size: 80% width, max-width 320px
- Border: 2px colored border matching status type
- Animation: Spring zoom-in + fade

---

## 3. Animation Flow

### VALIDATE Button Press

```
User Presses VALIDATE
        ↓
Mini Animation in Grid (300-500ms)
├─ Success: Pop animation + green flash
└─ Error: Bounce animation + red flash
        ↓
Status Message appears in header (1300ms/500ms)
├─ "✓ Correct!" (green)
└─ "✗ Invalid Sum" (red)
        ↓
Full Screen Displays (2-3 seconds)
├─ Success: Green screen with stats
└─ Error: Red screen with stats
        ↓
Auto-Close & Resume Gameplay
```

### CLEAR Button Press

```
User Presses CLEAR
        ↓
Selection immediately cleared
        ↓
Blue ActionStatusScreen shows (2 seconds)
        ↓
Auto-Close & Ready for new selection
```

### RESET Button Press

```
User Presses RESET
        ↓
Grid reshuffled immediately
        ↓
Orange ActionStatusScreen shows (2 seconds)
        ↓
Auto-Close & New game begins
```

### SKIP Button Press

```
User Presses SKIP
        ↓
Next puzzle loaded immediately
        ↓
Purple ActionStatusScreen shows (2 seconds)
        ↓
Auto-Close & New puzzle displayed
```

---

## 4. Color Scheme

| Action  | Color  | Hex     | Icon |
| ------- | ------ | ------- | ---- |
| Success | Green  | #4CAF50 | ✓    |
| Error   | Red    | #FF6B6B | ✗    |
| Clear   | Blue   | #2196F3 | ↻    |
| Reset   | Orange | #FF9800 | ⟲    |
| Skip    | Purple | #9C27B0 | ⊘    |

---

## 5. State Management

### GameContainer State Variables

```typescript
// Full-screen action states
const [showValidationScreen, setShowValidationScreen] = useState(false);
const [validationIsSuccess, setValidationIsSuccess] = useState(false);
const [showClearedScreen, setShowClearedScreen] = useState(false);
const [showResetScreen, setShowResetScreen] = useState(false);
const [showSkippedScreen, setShowSkippedScreen] = useState(false);

// Temp values for validation screen
const [lastTargetSum, setLastTargetSum] = useState(0);
const [lastSelectedSum, setLastSelectedSum] = useState(0);
const [lastSelectedCount, setLastSelectedCount] = useState(0);
```

### Event Handlers

**handleValidate()**

- Stores current game state (target, selection sum, cell count)
- Calls validateAndLock() hook
- Sets validation screen to show after mini animation completes

**handleClear()**

- Calls resetSelection()
- Shows clear screen for 2 seconds
- Auto-closes

**handleReset()**

- Calls resetGrid()
- Shows reset screen for 2 seconds
- Auto-closes

**handleSkip()**

- Calls skipPuzzle()
- Shows skip screen for 2 seconds
- Auto-closes

---

## 6. Screen Dimensions & Responsive Design

### Phone (320-480px width)

- Full screen overlay covering entire SafeAreaView
- Icon: 120px
- Title: 48px
- Subtitle: 20px
- Padding: 32px all sides

### Tablet (600px+ width)

- Could be adapted to show modal instead using ResultModal component
- Currently uses full-screen ActionStatusScreen for consistency

---

## 7. Performance Optimization

### GPU Acceleration

- All animations use React Native Reanimated 3
- Animations run on native thread, not JavaScript thread
- No jank even with complex transformations

### Memory

- Screens are conditionally rendered only when `visible={true}`
- No overhead when screens are hidden

### Frame Rate

- Target: 60 FPS maintained during all animations
- Spring animations naturally ease off (most expensive at start)

---

## 8. Future Enhancements

1. **Sound Effects**: Add completion/error sounds to screens
2. **Haptic Feedback**: Vibration patterns for different actions
3. **Leaderboard**: Show score on success screen
4. **Streak Counter**: Display consecutive correct answers
5. **Difficulty Indicator**: Show puzzle difficulty on skip
6. **Share Button**: Allow sharing success to social media
7. **Custom Messages**: Personalized feedback based on gameplay pattern

---

## 9. Testing Checklist

- [ ] Validate button shows correct/error screen based on selection
- [ ] Stats display accurate values (target, selected sum, cell count)
- [ ] Clear screen appears and closes after 2 seconds
- [ ] Reset screen appears and closes after 2 seconds
- [ ] Skip screen appears and closes after 2 seconds
- [ ] Mini animations play alongside full screens
- [ ] Colors match the design specifications
- [ ] Icons render clearly and bold
- [ ] Text is readable and properly sized
- [ ] Screens auto-close and allow resuming gameplay
- [ ] No lag or frame drops during animations
- [ ] Touch events work properly behind overlay
