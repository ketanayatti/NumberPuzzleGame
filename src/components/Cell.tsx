/**
 * Animated Cell Component
 * Enhanced cell component with comprehensive animation support
 * Includes success pop effects, error bouncing, and smooth transitions
 */

import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  useAnimatedReaction,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { ANIMATION_TIMING, COLOR_ANIMATIONS } from '../utils/animations';

interface CellProps {
  value: number;
  isSelected: boolean;
  isLocked: boolean;
  isAnimating?: boolean;
  isShaking?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  onPress: () => void;
  cellSize: number;
  testID?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Cell: React.FC<CellProps> = ({
  value,
  isSelected,
  isLocked,
  isAnimating = false,
  isShaking = false,
  isSuccess = false,
  isError = false,
  onPress,
  cellSize,
  testID,
}) => {
  // Shared animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const bgColorValue = useSharedValue(0);
  const successProgress = useSharedValue(0);
  const errorBounce = useSharedValue(0);

  // Handle selection animation
  useAnimatedReaction(
    () => isSelected,
    (selected) => {
      if (selected) {
        scale.value = withSpring(1.15, {
          damping: 10,
          mass: 1,
          overshootClamping: false,
        });
        bgColorValue.value = withTiming(1, {
          duration: ANIMATION_TIMING.CELL_SELECT,
          easing: Easing.ease,
        });
      } else if (!isLocked) {
        scale.value = withSpring(1, {
          damping: 10,
          mass: 1,
          overshootClamping: false,
        });
        bgColorValue.value = withTiming(0, {
          duration: ANIMATION_TIMING.CELL_DESELECT,
          easing: Easing.ease,
        });
      }
    },
    [isSelected, isLocked]
  );

  // Handle pop animation (match success)
  useAnimatedReaction(
    () => isAnimating,
    (animating) => {
      if (animating && isLocked) {
        // Pop effect with enhanced physics
        successProgress.value = withTiming(1, {
          duration: ANIMATION_TIMING.POP_EFFECT,
          easing: Easing.out(Easing.cubic),
        });

        scale.value = withTiming(0, {
          duration: ANIMATION_TIMING.POP_EFFECT,
          easing: Easing.out(Easing.cubic),
        });

        // Rotate during pop
        rotateZ.value = withTiming(180, {
          duration: ANIMATION_TIMING.POP_EFFECT,
          easing: Easing.out(Easing.cubic),
        });

        // Move upward as it vanishes
        translateY.value = withTiming(-cellSize, {
          duration: ANIMATION_TIMING.POP_EFFECT,
          easing: Easing.out(Easing.cubic),
        });

        opacity.value = withTiming(0, {
          duration: ANIMATION_TIMING.POP_EFFECT * 0.8,
          easing: Easing.in(Easing.ease),
        });
      }
    },
    [isAnimating, isLocked]
  );

  // Handle shake animation (error)
  useAnimatedReaction(
    () => isShaking,
    (shaking) => {
      if (shaking && isSelected) {
        const shakeDistance = 8;
        scale.value = withSpring(1.05, {
          damping: 4,
          mass: 1,
          overshootClamping: false,
        });

        // Shake sequence
        translateX.value = withTiming(shakeDistance, {
          duration: 50,
          easing: Easing.linear,
        });

        setTimeout(() => {
          translateX.value = withTiming(-shakeDistance, {
            duration: 50,
            easing: Easing.linear,
          });
        }, 50);

        setTimeout(() => {
          translateX.value = withTiming(shakeDistance, {
            duration: 50,
            easing: Easing.linear,
          });
        }, 100);

        setTimeout(() => {
          translateX.value = withTiming(0, {
            duration: 50,
            easing: Easing.linear,
          });
          scale.value = withSpring(1, {
            damping: 10,
            mass: 1,
            overshootClamping: false,
          });
        }, 150);
      }
    },
    [isShaking, isSelected]
  );

  // Handle error animation (bounce effect)
  useAnimatedReaction(
    () => isError,
    (error) => {
      if (error && isSelected) {
        errorBounce.value = withTiming(1, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        });

        // Bouncy scale animation
        scale.value = withSpring(1.15, {
          damping: 3,
          mass: 1.5,
          overshootClamping: false,
        });

        setTimeout(() => {
          scale.value = withSpring(0.95, {
            damping: 4,
            mass: 1,
            overshootClamping: false,
          });
        }, 150);

        setTimeout(() => {
          scale.value = withSpring(1, {
            damping: 6,
            mass: 1,
            overshootClamping: false,
          });
          errorBounce.value = withTiming(0, { duration: 200 });
        }, 300);
      }
    },
    [isError, isSelected]
  );

  // Handle success animation (glow effect)
  useAnimatedReaction(
    () => isSuccess,
    (success) => {
      if (success && isLocked) {
        scale.value = withSpring(1.1, {
          damping: 8,
          mass: 1,
          overshootClamping: false,
        });

        setTimeout(() => {
          scale.value = withSpring(1.05, {
            damping: 8,
            mass: 1,
            overshootClamping: false,
          });
        }, 100);
      }
    },
    [isSuccess, isLocked]
  );

  // Background color interpolation
  const backgroundColor = bgColorValue.value === 0
    ? COLOR_ANIMATIONS.NORMAL
    : isLocked
    ? COLOR_ANIMATIONS.LOCKED
    : isError
    ? COLOR_ANIMATIONS.ERROR
    : COLOR_ANIMATIONS.SELECTED;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: `${rotateZ.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const cellStyle = StyleSheet.create({
    container: {
      width: cellSize,
      height: cellSize,
      margin: 4,
      backgroundColor: isLocked ? COLOR_ANIMATIONS.LOCKED : COLOR_ANIMATIONS.NORMAL,
      borderRadius: cellSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: isSelected ? 3 : 1,
      borderColor: isSelected ? COLOR_ANIMATIONS.HIGHLIGHT : '#E0E0E0',
      elevation: isSelected ? 8 : 2,
      shadowColor: isSelected ? COLOR_ANIMATIONS.HIGHLIGHT : '#000',
      shadowOffset: { width: 0, height: isSelected ? 4 : 2 },
      shadowOpacity: isSelected ? 0.4 : 0.2,
      shadowRadius: isSelected ? 6 : 3,
    },
  });

  return (
    <AnimatedPressable
      style={[cellStyle.container, animatedStyle]}
      onPress={onPress}
      disabled={isLocked}
      testID={testID}
    >
      <Text
        style={{
          fontSize: cellSize * 0.4,
          fontWeight: '700',
          color: isLocked ? '#FFFFFF' : '#333333',
          textAlign: 'center',
        }}
      >
        {value}
      </Text>
    </AnimatedPressable>
  );
};

export default Cell;
