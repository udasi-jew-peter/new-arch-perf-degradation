import {Theme} from '../temp/theme';
import {useTheme} from '@shopify/restyle';
import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {ButtonSize} from './Button';

interface LoadingIndicatorProps {
  show: boolean;
  color: string;
  size: ButtonSize;
}

const dotPositionInitial = 0;
const dotPositionTop = -1;
const dotPositionBottom = 0.4;

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  show,
  size,
  color,
}) => {
  const {spacing, borderRadius, motion} = useTheme<Theme>();
  const visibilityTweener = useRef(new Animated.Value(0)).current;
  const dot1Tweener = useRef(new Animated.Value(0)).current;
  const dot2Tweener = useRef(new Animated.Value(0)).current;
  const dot3Tweener = useRef(new Animated.Value(0)).current;

  let dotPositionOffset = 10;
  if (size === 'm') {
    dotPositionOffset = 7;
  } else if (size === 's') {
    dotPositionOffset = 5;
  }

  useEffect(() => {
    if (show) {
      Animated.timing(visibilityTweener, {
        toValue: 1,
        duration: motion.durations.duration1,
        easing: motion.easings.standardEffective,
        delay: motion.delays.delay2,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1Tweener, {
            toValue: dotPositionTop,
            duration: motion.durations.duration3,
            easing: motion.easings.standardAttentive,
            delay: motion.delays.delay1 + motion.delays.delay2,
            useNativeDriver: true,
          }),
          Animated.timing(dot1Tweener, {
            toValue: dotPositionBottom,
            duration: motion.durations.duration2,
            easing: motion.easings.standardAttentive,
            useNativeDriver: true,
          }),
          Animated.timing(dot1Tweener, {
            toValue: dotPositionInitial,
            duration: motion.durations.duration3,
            easing: motion.easings.standardAttentive,
            useNativeDriver: true,
          }),
        ]),
        {iterations: -1},
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.delay(motion.delays.delay0 / 2),
          Animated.timing(dot2Tweener, {
            toValue: dotPositionTop,
            duration: motion.durations.duration3,
            easing: motion.easings.standardAttentive,
            delay: motion.delays.delay1 + motion.delays.delay2,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Tweener, {
            toValue: dotPositionBottom,
            duration: motion.durations.duration2,
            easing: motion.easings.standardAttentive,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Tweener, {
            toValue: dotPositionInitial,
            duration: motion.durations.duration3,
            easing: motion.easings.standardAttentive,
            useNativeDriver: true,
          }),
        ]),
        {iterations: -1},
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.delay(motion.delays.delay0),
          Animated.timing(dot3Tweener, {
            toValue: dotPositionTop,
            duration: motion.durations.duration3,
            easing: motion.easings.standardAttentive,
            delay: motion.delays.delay1 + motion.delays.delay2,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Tweener, {
            toValue: dotPositionBottom,
            duration: motion.durations.duration2,
            easing: motion.easings.standardAttentive,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Tweener, {
            toValue: dotPositionInitial,
            duration: motion.durations.duration3,
            easing: motion.easings.standardAttentive,
            useNativeDriver: true,
          }),
        ]),
        {iterations: -1},
      ).start();
    } else {
      Animated.timing(visibilityTweener, {
        toValue: 0,
        duration: motion.durations.duration0,
        delay: motion.delays.delay1,
        useNativeDriver: true,
      }).start();
      Animated.timing(dot1Tweener, {
        toValue: dotPositionInitial,
        duration: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(dot2Tweener, {
        toValue: dotPositionInitial,
        duration: 0,
        useNativeDriver: true,
      }).start();
      Animated.timing(dot3Tweener, {
        toValue: dotPositionInitial,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [motion, show, dot1Tweener, visibilityTweener, dot2Tweener, dot3Tweener]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        dot: {
          width: 8,
          height: 8,
          backgroundColor: color,
          borderRadius: borderRadius.circular,
        },
        container: {
          zIndex: 10,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: spacing.xxs,
        },
      }),
    [borderRadius, color],
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: visibilityTweener,
        },
      ]}>
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              {
                translateX: visibilityTweener.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-15, 0],
                }),
              },
              {translateY: Animated.multiply(dot1Tweener, dotPositionOffset)},
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              {translateY: Animated.multiply(dot2Tweener, dotPositionOffset)},
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            transform: [
              {
                translateX: visibilityTweener.interpolate({
                  inputRange: [0, 1],
                  outputRange: [15, 0],
                }),
              },
              {translateY: Animated.multiply(dot3Tweener, dotPositionOffset)},
            ],
          },
        ]}
      />
    </Animated.View>
  );
};
