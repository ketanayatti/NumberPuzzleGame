/**
 * Game Container Component
 * Simple game logic container for basic puzzle gameplay
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import Grid from './Grid';
import TargetDisplay from './TargetDisplay';
import ActionStatusScreen from './ActionStatusScreen';
import { useGrid } from '../hooks/useGrid';

interface GameContainerProps {
  gridRows?: number;
  gridCols?: number;
  testID?: string;
}

export const GameContainer: React.FC<GameContainerProps> = ({
  gridRows = 4,
  gridCols = 5,
  testID,
}) => {
  const {
    gridState,
    selectCell,
    deselectCell,
    validateAndLock,
    resetSelection,
    resetGrid,
    skipPuzzle,
  } = useGrid(gridRows, gridCols);

  const [isShaking, setIsShaking] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showErrorAnimation, setShowErrorAnimation] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

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

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Monitor error state for shake animation
  useEffect(() => {
    if (gridState.errorState) {
      setIsShaking(true);
      setShowErrorAnimation(true);
      setStatusMessage('✗ Invalid Sum');
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 400);
      const errorTimer = setTimeout(() => {
        setShowErrorAnimation(false);
        setStatusMessage('');
      }, 500);
      return () => {
        clearTimeout(timer);
        clearTimeout(errorTimer);
      };
    }
  }, [gridState.errorState]);

  // Monitor match state for pop animation
  useEffect(() => {
    if (gridState.matchFound) {
      setShowSuccessAnimation(true);
      setStatusMessage('✓ Correct!');
      const timer = setTimeout(() => {
        setShowSuccessAnimation(false);
        setStatusMessage('');
      }, 1300);
      return () => clearTimeout(timer);
    }
  }, [gridState.matchFound]);

  const handleCellPress = (row: number, col: number) => {
    const cell = gridState.cells.find((c) => c.row === row && c.col === col);
    if (cell?.isSelected) {
      deselectCell(row, col);
    } else {
      selectCell(row, col);
    }
  };

  const handleValidate = () => {
    if (gridState.selectedCells.length === 0) {
      Alert.alert('No Selection', 'Please select at least one cell.');
      return;
    }
    
    // Store values before validation
    setLastTargetSum(gridState.targetSum);
    setLastSelectedSum(gridState.currentSum);
    setLastSelectedCount(gridState.selectedCells.length);
    
    validateAndLock();
  };

  // Monitor match state and show full-screen success
  useEffect(() => {
    let screenTimer: NodeJS.Timeout;
    let nextPuzzleTimer: NodeJS.Timeout;
    let miniTimer: NodeJS.Timeout;

    if (gridState.matchFound) {
      // Show mini animation first
      setShowSuccessAnimation(true);
      setStatusMessage('✓ Correct!');
      
      // Then show full screen after brief delay
      screenTimer = setTimeout(() => {
        setValidationIsSuccess(true);
        setShowValidationScreen(true);
        
        // Auto-advance to next puzzle while success screen is up
        nextPuzzleTimer = setTimeout(() => {
          resetGrid();
        }, 1500);
      }, 700);
      
      miniTimer = setTimeout(() => {
        setShowSuccessAnimation(false);
        setStatusMessage('');
      }, 1300);
    }
      
    return () => {
      clearTimeout(screenTimer);
      clearTimeout(miniTimer);
      clearTimeout(nextPuzzleTimer);
    };
  }, [gridState.matchFound, resetGrid]);

  // Monitor error state and show error screen
  useEffect(() => {
    if (gridState.errorState) {
      setIsShaking(true);
      setShowErrorAnimation(true);
      setStatusMessage('✗ Invalid Sum');
      
      // Show error screen after mini animation
      const screenTimer = setTimeout(() => {
        setValidationIsSuccess(false);
        setShowValidationScreen(true);
      }, 500);
      
      const miniTimer = setTimeout(() => {
        setIsShaking(false);
      }, 400);
      
      const errorTimer = setTimeout(() => {
        setShowErrorAnimation(false);
        setStatusMessage('');
      }, 500);
      
      return () => {
        clearTimeout(screenTimer);
        clearTimeout(miniTimer);
        clearTimeout(errorTimer);
      };
    }
  }, [gridState.errorState]);

  // Handle clear action with screen feedback
  const handleClear = () => {
    resetSelection();
    setShowClearedScreen(true);
    setTimeout(() => setShowClearedScreen(false), 2000);
  };

  // Handle reset action with screen feedback
  const handleReset = () => {
    resetGrid();
    setShowResetScreen(true);
    setTimeout(() => setShowResetScreen(false), 2000);
  };

  // Handle skip action with screen feedback
  const handleSkip = () => {
    skipPuzzle();
    setShowSkippedScreen(true);
    setTimeout(() => setShowSkippedScreen(false), 2000);
  };

  // Auto-close validation screen after display
  useEffect(() => {
    if (showValidationScreen) {
      const timer = setTimeout(() => {
        setShowValidationScreen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showValidationScreen]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAFAFA',
      justifyContent: 'space-between',
    },
    topSection: {
      backgroundColor: '#FAFAFA',
      paddingHorizontal: 0,
      paddingVertical: 0,
      borderBottomWidth: 0,
      zIndex: 10,
    },
    gridSection: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 6,
    },
    bottomSection: {
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 0,
      paddingVertical: 0,
      borderTopWidth: 2,
      borderTopColor: '#F0F0F0',
    },
    header: {
      marginTop: 0,
      marginBottom: 0,
      paddingHorizontal: 16,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
      color: '#333333',
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 10,
      color: '#888888',
      marginTop: 1,
      fontWeight: '500',
    },
    controlsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 8,
      marginHorizontal: 12,
      gap: 8,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    validateButton: {
      backgroundColor: '#4ECDC4',
      flex: 2,
    },
    clearButton: {
      backgroundColor: '#FFB347',
      flex: 1,
    },
    resetButton: {
      backgroundColor: '#FF6B6B',
      flex: 1,
    },
    skipButton: {
      backgroundColor: '#B0BEC5',
      flex: 1,
    },
    buttonText: {
      fontSize: 11,
      fontWeight: '800',
      color: '#FFFFFF',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    statsContainer: {
      backgroundColor: '#F8F8F8',
      borderRadius: 12,
      padding: 12,
      marginVertical: 8,
      marginHorizontal: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 0,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statLabel: {
      fontSize: 11,
      color: '#666666',
      marginBottom: 3,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 0.4,
    },
    statValue: {
      fontSize: 18,
      fontWeight: '900',
      color: '#2196F3',
      letterSpacing: -0.5,
    },
  });

  const availableCellsCount = gridState.cells.filter((c) => !c.isLocked).length;
  const selectedPercentage =
    availableCellsCount > 0
      ? Math.round((gridState.selectedCells.length / availableCellsCount) * 100)
      : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== TOP SECTION: Header + Target Display ===== */}
      <View style={styles.topSection}>
        {/* Simple Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Number Puzzle</Text>
          <Text style={styles.subtitle}>
            Find the combination that sums to the target
          </Text>
        </View>

        {/* Target Display */}
        <TargetDisplay
          targetSum={gridState.targetSum}
          currentSum={gridState.currentSum}
          selectedCount={gridState.selectedCells.length}
          requiredCount={gridState.requiredSelectionCount}
          isMatching={gridState.matchFound}
          isError={showErrorAnimation}
        />

        {/* Status Message */}
        {statusMessage ? (
          <View
            style={{
              alignItems: 'center',
              marginVertical: 2,
              paddingVertical: 3,
              borderRadius: 4,
              backgroundColor:
                statusMessage.includes('Correct') ? '#E8F5E9' : '#FFEBEE',
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: '700',
                color:
                  statusMessage.includes('Correct') ? '#4CAF50' : '#FF6B6B',
                letterSpacing: 0.2,
              }}
            >
              {statusMessage}
            </Text>
          </View>
        ) : null}
      </View>

      {/* ===== MIDDLE SECTION: Grid ===== */}
      <View style={styles.gridSection}>
        <Grid
          gridState={gridState}
          onCellPress={handleCellPress}
          isShaking={isShaking}
          isAnimatingSuccess={showSuccessAnimation}
          isAnimatingError={showErrorAnimation}
        />
      </View>

      {/* ===== BOTTOM SECTION: Stats + Controls ===== */}
      <View style={styles.bottomSection}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={styles.statValue}>{availableCellsCount}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Grid Size</Text>
              <Text style={styles.statValue}>{gridState.gridRows}x{gridState.gridCols}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Selection %</Text>
              <Text style={styles.statValue}>{selectedPercentage}%</Text>
            </View>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.validateButton]}
            onPress={handleValidate}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>VALIDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>CLEAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>SKIP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== ACTION SCREENS ===== */}
      {/* Validation Screen (Success/Error) */}
      <ActionStatusScreen
        visible={showValidationScreen}
        action="validate"
        isSuccess={validationIsSuccess}
        targetSum={lastTargetSum}
        selectedSum={lastSelectedSum}
        selectedCount={lastSelectedCount}
      />

      {/* Cleared Screen */}
      <ActionStatusScreen
        visible={showClearedScreen}
        action="clear"
      />

      {/* Reset Screen */}
      <ActionStatusScreen
        visible={showResetScreen}
        action="reset"
      />

      {/* Skipped Screen */}
      <ActionStatusScreen
        visible={showSkippedScreen}
        action="skip"
      />
    </SafeAreaView>
  );
};

export default GameContainer;
