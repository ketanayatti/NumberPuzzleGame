/**
 * Result Modal Component
 * Animated overlay showing game results and actions
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

interface ResultModalProps {
  visible: boolean;
  type: 'success' | 'error' | 'cleared' | 'reset' | 'skipped';
  message: string;
  description?: string;
  testID?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const ResultModal: React.FC<ResultModalProps> = ({
  visible,
  type,
  message,
  description,
  testID,
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const translateY = useSharedValue(50);

  // Animation colors based on type
  const getColors = () => {
    switch (type) {
      case 'success':
        return { bg: '#E8F5E9', text: '#4CAF50', icon: '✓', border: '#81C784' };
      case 'error':
        return { bg: '#FFEBEE', text: '#FF6B6B', icon: '✗', border: '#EF5350' };
      case 'cleared':
        return { bg: '#E3F2FD', text: '#2196F3', icon: '↻', border: '#64B5F6' };
      case 'reset':
        return { bg: '#FFF3E0', text: '#FF9800', icon: '⟲', border: '#FFB74D' };
      case 'skipped':
        return { bg: '#F3E5F5', text: '#9C27B0', icon: '⊘', border: '#CE93D8' };
      default:
        return { bg: '#F5F5F5', text: '#666', icon: '•', border: '#999' };
    }
  };

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.cubic) });
      scale.value = withSpring(1, { damping: 6, mass: 1 });
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.5, { duration: 200 });
      translateY.value = withTiming(50, { duration: 200 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  const colors = getColors();

  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContainer: {
      backgroundColor: colors.bg,
      borderRadius: 16,
      padding: 32,
      alignItems: 'center',
      minWidth: '80%',
      maxWidth: 320,
      borderWidth: 2,
      borderColor: colors.border,
    },
    icon: {
      fontSize: 64,
      color: colors.text,
      marginBottom: 16,
      fontWeight: '800',
    },
    message: {
      fontSize: 24,
      fontWeight: '800',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    description: {
      fontSize: 14,
      color: colors.text,
      textAlign: 'center',
      opacity: 0.8,
      marginBottom: 16,
      fontWeight: '500',
    },
    hint: {
      fontSize: 12,
      color: colors.text,
      textAlign: 'center',
      opacity: 0.6,
      marginTop: 12,
      fontStyle: 'italic',
    },
  });

  if (!visible && opacity.value === 0) {
    return null;
  }

  return (
    <AnimatedView style={[styles.overlay, animatedStyle]} testID={testID}>
      <AnimatedView style={[styles.modalContainer, animatedStyle]}>
        <Text style={styles.icon}>{colors.icon}</Text>
        <Text style={styles.message}>{message}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <Text style={styles.hint}>
          {type === 'success' && '🎉 Great Match!'}
          {type === 'error' && '⚠️ Try Again'}
          {type === 'cleared' && '↻ Selection Cleared'}
          {type === 'reset' && '⟲ Game Reset'}
          {type === 'skipped' && '⊘ Puzzle Skipped'}
        </Text>
      </AnimatedView>
    </AnimatedView>
  );
};

export default ResultModal;
