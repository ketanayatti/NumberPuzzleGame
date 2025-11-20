# UI/UX Flow Guide - Action Screens

## Overview

This document shows the complete user flow and visual hierarchy of the redesigned game interface with new animated action screens.

---

## Layout Structure

### Main Game Screen (Always Visible)

```
┌─────────────────────────────────────────────┐
│  SafeAreaView (Flex: 1)                    │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ TOP SECTION (White Background)       │  │
│  ├──────────────────────────────────────┤  │
│  │ • Header: "Number Puzzle"            │  │
│  │   "Find the combination..."          │  │
│  │                                      │  │
│  │ • TargetDisplay                      │  │
│  │   Target: 15 | Current: 0 | Cells: 0│  │
│  │   [animated border glow]             │  │
│  │                                      │  │
│  │ • Status Message (when active)       │  │
│  │   "✓ Correct!" / "✗ Invalid Sum"   │  │
│  └──────────────────────────────────────┘  │
│        ↑ Border (#F0F0F0)                   │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ GRID SECTION (Flex: 1, Centered)     │  │
│  ├──────────────────────────────────────┤  │
│  │           ┌────┬────┬────┬────┐      │  │
│  │           │ 3  │ 7  │ 2  │ 5  │      │  │
│  │           ├────┼────┼────┼────┤      │  │
│  │           │ 4  │ 1  │ 8  │ 6  │      │  │
│  │           ├────┼────┼────┼────┤      │  │
│  │           │ 9  │ 2  │ 4  │ 3  │      │  │
│  │           ├────┼────┼────┼────┤      │  │
│  │           │ 5  │ 6  │ 7  │ 1  │      │  │
│  │           ├────┼────┼────┼────┤      │  │
│  │           │ 8  │ 9  │ 3  │ 2  │      │  │
│  │           └────┴────┴────┴────┘      │  │
│  │    4 rows × 5 columns = 20 cells     │  │
│  └──────────────────────────────────────┘  │
│        ↑ Border (#F0F0F0)                   │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ BOTTOM SECTION (White Background)    │  │
│  ├──────────────────────────────────────┤  │
│  │ Stats Row:                           │  │
│  │   Remaining: 20  Grid Size: 4x5      │  │
│  │   Selection %: 0%                    │  │
│  │                                      │  │
│  │ Buttons (Full Width Row):            │  │
│  │ ┌──────┬──┬──┬──────────┐           │  │
│  │ │VALIDATE   │CLR│SKP│RESET│           │  │
│  │ └──────┴──┴──┴──────────┘           │  │
│  │ (Teal) (Orange) (Gray) (Red)        │  │
│  └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Action Screen Overlays (Full Screen, Auto-Hide)

### When User Presses VALIDATE - SUCCESS ✓

```
┌─────────────────────────────────────────────┐
│ ActionStatusScreen (Green Overlay)          │
├─────────────────────────────────────────────┤
│                                             │
│          ✓  (64px, Bold)                   │
│                                             │
│        CORRECT!  (48px, Bold)              │
│                                             │
│     Excellent Match!  (20px)               │
│                                             │
│        Target: 15                          │
│      Your Sum: 15                          │
│    Cells Selected: 3                       │
│                                             │
│   Duration: 3 seconds (auto-close)         │
│   Animations: Spring icon + fade text      │
│                                             │
│   Background: #4CAF50 (Green)              │
│   Border: #81C784 (Light Green)            │
│                                             │
└─────────────────────────────────────────────┘
```

### When User Presses VALIDATE - ERROR ✗

```
┌─────────────────────────────────────────────┐
│ ActionStatusScreen (Red Overlay)            │
├─────────────────────────────────────────────┤
│                                             │
│          ✗  (64px, Bold)                   │
│                                             │
│      INCORRECT  (48px, Bold)               │
│                                             │
│        Try Again  (20px)                   │
│                                             │
│        Target: 15                          │
│      Your Sum: 18                          │
│    Cells Selected: 4                       │
│                                             │
│   Duration: 3 seconds (auto-close)         │
│   Animations: Spring icon + fade text      │
│                                             │
│   Background: #FF6B6B (Red)                │
│   Border: #EF5350 (Light Red)              │
│                                             │
└─────────────────────────────────────────────┘
```

### When User Presses CLEAR

```
┌─────────────────────────────────────────────┐
│ ActionStatusScreen (Blue Overlay)           │
├─────────────────────────────────────────────┤
│                                             │
│          ↻  (64px, Bold)                   │
│                                             │
│       CLEARED  (48px, Bold)                │
│                                             │
│    Selection Reset  (20px)                 │
│                                             │
│   Ready for new selection                  │
│                                             │
│   Duration: 2 seconds (auto-close)         │
│   Animations: Spring icon + fade text      │
│                                             │
│   Background: #2196F3 (Blue)               │
│   Border: #64B5F6 (Light Blue)             │
│                                             │
└─────────────────────────────────────────────┘
```

### When User Presses RESET

```
┌─────────────────────────────────────────────┐
│ ActionStatusScreen (Orange Overlay)         │
├─────────────────────────────────────────────┤
│                                             │
│          ⟲  (64px, Bold)                   │
│                                             │
│        RESET  (48px, Bold)                 │
│                                             │
│    New Game Started  (20px)                │
│                                             │
│      All cells shuffled                    │
│                                             │
│   Duration: 2 seconds (auto-close)         │
│   Animations: Spring icon + fade text      │
│                                             │
│   Background: #FF9800 (Orange)             │
│   Border: #FFB74D (Light Orange)           │
│                                             │
└─────────────────────────────────────────────┘
```

### When User Presses SKIP

```
┌─────────────────────────────────────────────┐
│ ActionStatusScreen (Purple Overlay)         │
├─────────────────────────────────────────────┤
│                                             │
│          ⊘  (64px, Bold)                   │
│                                             │
│       SKIPPED  (48px, Bold)                │
│                                             │
│     Moving to Next  (20px)                 │
│                                             │
│     Loading new puzzle...                  │
│                                             │
│   Duration: 2 seconds (auto-close)         │
│   Animations: Spring icon + fade text      │
│                                             │
│   Background: #9C27B0 (Purple)             │
│   Border: #CE93D8 (Light Purple)           │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Complete User Flow Diagram

```
                      START GAME
                           ↓
                    ╔════════════════╗
                    ║  GAME SCREEN   ║
                    ║   (4x5 Grid)   ║
                    ╚════════════════╝
                           ↓
              ┌────────────┼────────────┐
              ↓            ↓            ↓
          CLICK CELL   CLICK CELL   (repeat)
          (select)     (deselect)
              ↓            ↓
              └─────┬──────┘
                    ↓
        ┌───────────────────────┐
        │  Press Button         │
        └───────────────────────┘
              ↙    ↓    ↓    ↖
           VALIDATE CLEAR SKIP RESET
             ↙       ↓    ↓    ↖

    VALIDATE → Check Sum
        ↙              ↖
      ✓ CORRECT        ✗ INCORRECT
       ↓                   ↓
    🟢 GREEN SCREEN    🔴 RED SCREEN
       │                   │
       └─────┬─────────────┘
             ↓
      (2-3 sec auto-close)
             ↓
        Resume Game
             ↓
    ┌──────────────────────┐
    │  Continue Playing    │
    │  or Select Action    │
    └──────────────────────┘

CLEAR → 🔵 BLUE SCREEN → Auto-close (2 sec) → Resume
         (Selection cleared)

RESET → 🟠 ORANGE SCREEN → Auto-close (2 sec) → New Game
        (Grid shuffled)

SKIP → 🟣 PURPLE SCREEN → Auto-close (2 sec) → New Puzzle
       (Next puzzle loaded)
```

---

## Animation Timeline

### VALIDATE - Success Path

```
Timeline (ms)  Action
0              User presses VALIDATE
0-500          Mini pop animation in grid (at correct cells)
0-1300         Status message "✓ Correct!" appears
200-300        Mini animation fades out
700            Transition to full screen
700-1000       Green screen springs in (icon, text)
1000-1200      Stats fade in (200ms delay)
1000-3000      Screen displays
3000-3300      Screen fades out
3300+          Resume gameplay
```

### CLEAR Path

```
Timeline (ms)  Action
0              User presses CLEAR
0-50           Selection immediately cleared
50-350         Blue screen springs in
350-2350       Screen displays
2350-2550      Screen fades out
2550+          Resume gameplay (ready for new selection)
```

---

## Button Design Details

### Button Container Row

```
Full Width Flex Container
├─ VALIDATE (Flex: 2 - 50%)
│  └─ #4ECDC4 (Teal)
│     Padding: 6px vertical, 8px horizontal
│     Font: 9px, Bold
│     Text: "VALIDATE"
│
├─ CLEAR (Flex: 1 - 25%)
│  └─ #FFB347 (Orange)
│
├─ SKIP (Flex: 1 - 25%)
│  └─ #B0BEC5 (Gray)
│
└─ RESET (Flex: 1 - 25%)
   └─ #FF6B6B (Red)
```

All buttons have:

- Rounded corners: 6px
- Shadow: Elevation 2
- Active opacity: 0.8 (press feedback)
- Touch target: Min 44px height (accessibility)

---

## Color Palette Summary

| Element               | Color        | Hex     |
| --------------------- | ------------ | ------- |
| Success Screen BG     | Green        | #4CAF50 |
| Success Screen Border | Light Green  | #81C784 |
| Error Screen BG       | Red          | #FF6B6B |
| Error Screen Border   | Light Red    | #EF5350 |
| Clear Screen BG       | Blue         | #2196F3 |
| Clear Screen Border   | Light Blue   | #64B5F6 |
| Reset Screen BG       | Orange       | #FF9800 |
| Reset Screen Border   | Light Orange | #FFB74D |
| Skip Screen BG        | Purple       | #9C27B0 |
| Skip Screen Border    | Light Purple | #CE93D8 |
| Validate Button       | Teal         | #4ECDC4 |
| Clear Button          | Orange       | #FFB347 |
| Skip Button           | Gray         | #B0BEC5 |
| Reset Button          | Red          | #FF6B6B |
| Section Border        | Light Gray   | #F0F0F0 |
| Section Background    | White        | #FFFFFF |
| App Background        | Off-White    | #FAFAFA |

---

## Responsive Adjustments

### Phone (320px width)

- All screens use full-screen overlay
- Padding: 32px
- Icon: 120px
- Title: 48px
- No modal styling

### Tablet (600px+)

- Could switch to ResultModal component (smaller, centered)
- Current implementation: Full-screen ActionStatusScreen for consistency

---

## Accessibility Considerations

1. **High Contrast**: All text readable against backgrounds
2. **Large Touch Targets**: Buttons ≥ 44px height
3. **Clear Icons**: Simple, universally understood symbols
4. **Status Messages**: Clear language, no jargon
5. **Animation Duration**: Long enough to read (2-3 seconds)
6. **Focus States**: Visual feedback on button press (activeOpacity)
