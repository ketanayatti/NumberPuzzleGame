/**
 * Action Status Screen Component
 * Full-screen animated feedback for game actions
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

interface ActionStatusScreenProps {
  visible: boolean;
  action: 'validate' | 'clear' | 'reset' | 'skip';
  isSuccess?: boolean;
  targetSum?: number;
  selectedSum?: number;
  selectedCount?: number;
  testID?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

export const ActionStatusScreen: React.FC<ActionStatusScreenProps> = ({
  visible,
  action,
  isSuccess,
  targetSum,
  selectedSum,
  selectedCount,
  testID,
}) => {
  const backgroundColor = useSharedValue(0);
  const iconScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const statsOpacity = useSharedValue(0);

  const getActionConfig = () => {
    switch (action) {
      case 'validate':
        return isSuccess
          ? {
              bgColor: '#4CAF50',
              icon: '✓',
              title: 'CORRECT!',
              subtitle: 'Excellent Match!',
              color: '#FFF',
            }
          : {
              bgColor: '#FF6B6B',
              icon: '✗',
              title: 'INCORRECT',
              subtitle: 'Try Again',
              color: '#FFF',
            };
      case 'clear':
        return {
          bgColor: '#2196F3',
          icon: '↻',
          title: 'CLEARED',
          subtitle: 'Selection Reset',
          color: '#FFF',
        };
      case 'reset':
        return {
          bgColor: '#FF9800',
          icon: '⟲',
          title: 'RESET',
          subtitle: 'New Game Started',
          color: '#FFF',
        };
      case 'skip':
        return {
          bgColor: '#9C27B0',
          icon: '⊘',
          title: 'SKIPPED',
          subtitle: 'Moving to Next',
          color: '#FFF',
        };
      default:
        return {
          bgColor: '#666',
          icon: '•',
          title: 'ACTION',
          subtitle: 'Processing',
          color: '#FFF',
        };
    }
  };

  useEffect(() => {
    if (visible) {
      iconScale.value = withSpring(1, { damping: 6, mass: 1, overshootClamping: false });
      textOpacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) });
      
      // Use setTimeout for the delayed stats animation instead of withTiming delay
      setTimeout(() => {
        statsOpacity.value = withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.cubic),
        });
      }, 200);
    } else {
      iconScale.value = withTiming(0, { duration: 200 });
      textOpacity.value = withTiming(0, { duration: 200 });
      statsOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const config = getActionConfig();

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: config.bgColor,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    contentContainer: {
      alignItems: 'center',
    },
    icon: {
      fontSize: 120,
      fontWeight: '900',
      color: config.color,
      marginBottom: 24,
    },
    title: {
      fontSize: 48,
      fontWeight: '900',
      color: config.color,
      marginBottom: 8,
      letterSpacing: -1,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 20,
      color: config.color,
      opacity: 0.9,
      textAlign: 'center',
      marginBottom: 24,
      fontWeight: '600',
    },
    statsContainer: {
      marginTop: 24,
      paddingTop: 20,
      borderTopWidth: 2,
      borderTopColor: config.color,
      opacity: 0.85,
    },
    statRow: {
      fontSize: 16,
      color: config.color,
      marginVertical: 6,
      fontWeight: '500',
      letterSpacing: 0.5,
    },
  });

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.contentContainer}>
        <AnimatedText style={[styles.icon, iconAnimatedStyle]}>
          {config.icon}
        </AnimatedText>

        <AnimatedText style={[styles.title, textAnimatedStyle]}>
          {config.title}
        </AnimatedText>

        <AnimatedText style={[styles.subtitle, textAnimatedStyle]}>
          {config.subtitle}
        </AnimatedText>

        {(action === 'validate' || selectedCount !== undefined) && (
          <AnimatedView style={[styles.statsContainer, statsAnimatedStyle]}>
            {action === 'validate' && (
              <>
                <Text style={styles.statRow}>
                  Target: {targetSum}
                </Text>
                <Text style={styles.statRow}>
                  Your Sum: {selectedSum}
                </Text>
                <Text style={styles.statRow}>
                  Cells Selected: {selectedCount}
                </Text>
              </>
            )}
            {action === 'clear' && (
              <Text style={styles.statRow}>
                Ready for new selection
              </Text>
            )}
            {action === 'reset' && (
              <Text style={styles.statRow}>
                All cells shuffled
              </Text>
            )}
            {action === 'skip' && (
              <Text style={styles.statRow}>
                Loading new puzzle...
              </Text>
            )}
          </AnimatedView>
        )}
      </View>
    </View>
  );
};

export default ActionStatusScreen;
