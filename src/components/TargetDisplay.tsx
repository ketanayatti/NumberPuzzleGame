/**
 * Target Display Component
 * Enhanced with comprehensive visual feedback and animations
 * Shows target sum, current sum, and match status with animated indicators
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface TargetDisplayProps {
  targetSum: number;
  currentSum: number;
  selectedCount: number;
  requiredCount?: number;
  isMatching?: boolean;
  isError?: boolean;
  testID?: string;
}

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedView = Animated.createAnimatedComponent(View);

export const TargetDisplay: React.FC<TargetDisplayProps> = ({
  targetSum,
  currentSum,
  selectedCount,
  requiredCount = 0,
  isMatching = false,
  isError = false,
  testID,
}) => {
  const pulseScale = useSharedValue(1);
  const errorShake = useSharedValue(0);
  const matchGlow = useSharedValue(0);
  const targetColor = currentSum === targetSum && selectedCount > 0 ? '#4ECDC4' : '#333333';

  // Match found animation
  useEffect(() => {
    if (isMatching) {
      matchGlow.value = withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });

      pulseScale.value = withSpring(1.3, {
        damping: 6,
        mass: 1,
        overshootClamping: false,
      });

      setTimeout(() => {
        pulseScale.value = withSpring(1, {
          damping: 8,
          mass: 1,
          overshootClamping: false,
        });
      }, 300);

      setTimeout(() => {
        matchGlow.value = withTiming(0, { duration: 500 });
      }, 1000);
    }
  }, [isMatching]);

  // Error animation
  useEffect(() => {
    if (isError) {
      // Bounce error shake
      errorShake.value = withTiming(1, {
        duration: 100,
        easing: Easing.out(Easing.ease),
      });

      setTimeout(() => {
        errorShake.value = withTiming(0, {
          duration: 200,
          easing: Easing.out(Easing.ease),
        });
      }, 100);
    }
  }, [isError]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const errorStyle = useAnimatedStyle(() => {
    const shake = interpolate(errorShake.value, [0, 1], [0, -8], Extrapolate.CLAMP);
    return {
      transform: [{ translateX: shake }],
    };
  });

  const glowOverlayStyle = useAnimatedStyle(() => ({
    opacity: matchGlow.value,
    shadowOpacity: matchGlow.value * 0.8,
  }));

  const progress = Math.min(Math.max(currentSum / (targetSum || 1), 0), 1);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(progress * 100, { duration: 400 });
  }, [progress]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
    backgroundColor: isError ? '#FF6B6B' : currentSum > targetSum ? '#FFB347' : '#4ECDC4',
  }));

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      alignSelf: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 6,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.04)',
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginBottom: 12,
    },
    targetLabel: {
      fontSize: 12,
      fontWeight: '700',
      color: '#888888',
      letterSpacing: 1.5,
      marginRight: 8,
      textTransform: 'uppercase',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: '#4ECDC4',
      borderRadius: 3,
    },
    progressContainer: {
      height: 8,
      width: '100%',
      backgroundColor: '#F5F7FA',
      borderRadius: 4,
      marginBottom: 16,
      overflow: 'hidden',
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 4,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statLabel: {
      fontSize: 10,
      color: '#999999',
      marginBottom: 4,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    statValueContainer: {
      backgroundColor: '#F8F9FA',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 12,
      minWidth: 60,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 16,
      fontWeight: '700',
      color: '#333333',
    },
    matchIndicator: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: '#E8F5E9',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#4CAF50',
    },
    matchText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#4CAF50',
    },
    glowOverlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 24,
      backgroundColor: '#4ECDC4',
      opacity: 0,
    },
  });

  return (
    <AnimatedView
      style={[styles.container, errorStyle]}
      testID={testID}
    >
      <Animated.View style={glowOverlayStyle}>
        <View style={styles.glowOverlay} />
      </Animated.View>

      {/* Header with Target */}
      <View style={styles.headerRow}>
        <Text style={styles.targetLabel}>TARGET</Text>
        <Animated.Text style={[styles.targetValue, animatedStyle, { color: targetColor }]}>
          {targetSum}
        </Animated.Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBarFill, progressStyle]} />
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Current</Text>
          <View style={styles.statValueContainer}>
            <Animated.Text style={[styles.statValue, animatedStyle]}>
              {currentSum}
            </Animated.Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Selected</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>
              {selectedCount}
              <Text style={{ fontSize: 12, color: '#BBB' }}>
                {requiredCount > 0 ? `/${requiredCount}` : ''}
              </Text>
            </Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Left</Text>
          <View style={styles.statValueContainer}>
            <Text style={[styles.statValue, { color: '#FF8C00' }]}>
              {Math.max(0, targetSum - currentSum)}
            </Text>
          </View>
        </View>
      </View>

      {currentSum === targetSum && selectedCount > 0 && (
        <Animated.View style={[styles.matchIndicator, animatedStyle]}>
          <Text style={styles.matchText}>✓ MATCH</Text>
        </Animated.View>
      )}
    </AnimatedView>
  );
};

export default TargetDisplay;
