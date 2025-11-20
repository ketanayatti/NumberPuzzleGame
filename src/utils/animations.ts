/**
 * Animation utilities and configurations for React Native Reanimated
 */

import Animated, { Easing, useSharedValue } from 'react-native-reanimated';

/**
 * Animation timing configurations
 */
export const ANIMATION_TIMING = {
  CELL_SELECT: 200,
  CELL_DESELECT: 150,
  MATCH_SUCCESS: 600,
  ERROR_SHAKE: 400,
  CELL_PULSE: 500,
  POP_EFFECT: 700,
} as const;

/**
 * Animation easing functions
 */
export const ANIMATION_EASING = {
  SMOOTH: Easing.bezier(0.25, 0.1, 0.25, 1),
  BOUNCE: Easing.bounce,
  ELASTIC: Easing.elastic(1.2),
  EASE_OUT_QUAD: Easing.out(Easing.quad),
  EASE_OUT_CUBIC: Easing.out(Easing.cubic),
} as const;

/**
 * Animation keyframes for pop effect
 */
export const createPopAnimation = () => {
  return {
    scale: [0.9, 1.15, 0.8, 0],
    opacity: [1, 1, 1, 0],
    duration: ANIMATION_TIMING.POP_EFFECT,
  };
};

/**
 * Animation keyframes for shake/wiggle effect
 */
export const createShakeAnimation = () => {
  return {
    translateX: [0, -10, 10, -10, 10, 0],
    duration: ANIMATION_TIMING.ERROR_SHAKE,
  };
};

/**
 * Animation keyframes for pulse effect
 */
export const createPulseAnimation = () => {
  return {
    scale: [1, 1.1, 1],
    duration: ANIMATION_TIMING.CELL_PULSE,
  };
};

/**
 * Animation keyframes for cell selection
 */
export const createSelectionAnimation = () => {
  return {
    scale: [1, 1.15],
    duration: ANIMATION_TIMING.CELL_SELECT,
  };
};

/**
 * Animation keyframes for cell deselection
 */
export const createDeselectionAnimation = () => {
  return {
    scale: [1.15, 1],
    duration: ANIMATION_TIMING.CELL_DESELECT,
  };
};

/**
 * Color animations for selection feedback
 */
export const COLOR_ANIMATIONS = {
  SELECTED: '#FFD700', // Gold
  NORMAL: '#FFFFFF', // White
  ERROR: '#FF6B6B', // Red
  LOCKED: '#4ECDC4', // Teal (completed)
  HIGHLIGHT: '#FF8C00', // Orange
} as const;

/**
 * Shared animation values
 */
export const createSharedValue = (initialValue: number) => {
  // This is a helper for use in components with the useSharedValue hook
  return initialValue;
};
