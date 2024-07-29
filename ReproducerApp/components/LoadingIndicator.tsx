import {Theme} from '../temp/theme';
import {useTheme} from '@shopify/restyle';
import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
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
  const visibilityTweener = useSharedValue(0);
  const dot1Tweener = useSharedValue(0);
  const dot2Tweener = useSharedValue(0);
  const dot3Tweener = useSharedValue(0);

  let dotPositionOffset = 10;
  if (size === 'm') {
    dotPositionOffset = 7;
  } else if (size === 's') {
    dotPositionOffset = 5;
  }

  useEffect(() => {
    if (show) {
      visibilityTweener.value = withDelay(
        motion.delays.delay2,
        withTiming(1, {
          duration: motion.durations.duration1,
          easing: motion.easings.standardEffective,
        }),
      );
      dot1Tweener.value = withRepeat(
        withSequence(
          withDelay(
            motion.delays.delay1 + motion.delays.delay2,
            withTiming(dotPositionTop, {
              duration: motion.durations.duration3,
              easing: motion.easings.standardAttentive,
            }),
          ),
          withTiming(dotPositionBottom, {
            duration: motion.durations.duration2,
            easing: motion.easings.standardAttentive,
          }),
          withTiming(dotPositionInitial, {
            duration: motion.durations.duration3,
            easing: motion.easings.standardAttentive,
          }),
        ),
        -1,
      );
      dot2Tweener.value = withDelay(
        motion.delays.delay0 / 2,
        withRepeat(
          withSequence(
            withDelay(
              motion.delays.delay1 + motion.delays.delay2,
              withTiming(dotPositionTop, {
                duration: motion.durations.duration3,
                easing: motion.easings.standardAttentive,
              }),
            ),
            withTiming(dotPositionBottom, {
              duration: motion.durations.duration2,
              easing: motion.easings.standardAttentive,
            }),
            withTiming(dotPositionInitial, {
              duration: motion.durations.duration3,
              easing: motion.easings.standardAttentive,
            }),
          ),
          -1,
        ),
      );
      dot3Tweener.value = withDelay(
        motion.delays.delay0,
        withRepeat(
          withSequence(
            withDelay(
              motion.delays.delay1 + motion.delays.delay2,
              withTiming(dotPositionTop, {
                duration: motion.durations.duration3,
                easing: motion.easings.standardAttentive,
              }),
            ),
            withTiming(dotPositionBottom, {
              duration: motion.durations.duration2,
              easing: motion.easings.standardAttentive,
            }),
            withTiming(dotPositionInitial, {
              duration: motion.durations.duration3,
              easing: motion.easings.standardAttentive,
            }),
          ),
          -1,
        ),
      );
    } else {
      visibilityTweener.value = withDelay(
        motion.delays.delay1,
        withTiming(0, {duration: motion.durations.duration0}),
      );
      dot1Tweener.value = dotPositionInitial;
      dot2Tweener.value = dotPositionInitial;
      dot3Tweener.value = dotPositionInitial;
    }
  }, [motion, show, dot1Tweener, visibilityTweener, dot2Tweener, dot3Tweener]);

  const containerStyle = useAnimatedStyle(() => ({
    zIndex: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xxs,
    opacity: visibilityTweener.value,
  }));

  const dot1Style = useAnimatedStyle(() => ({
    transform: [
      {translateX: interpolate(visibilityTweener.value, [0, 1], [-15, 0])},
      {translateY: dot1Tweener.value * dotPositionOffset},
    ],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{translateY: dot2Tweener.value * dotPositionOffset}],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [
      {translateX: interpolate(visibilityTweener.value, [0, 1], [15, 0])},
      {translateY: dot3Tweener.value * dotPositionOffset},
    ],
  }));

  const styles = useMemo(
    () =>
      StyleSheet.create({
        dot: {
          width: 8,
          height: 8,
          backgroundColor: color,
          borderRadius: borderRadius.circular,
        },
      }),
    [borderRadius, color],
  );

  return (
    <Animated.View style={containerStyle}>
      <Animated.View style={[styles.dot, dot1Style]} />
      <Animated.View style={[styles.dot, dot2Style]} />
      <Animated.View style={[styles.dot, dot3Style]} />
    </Animated.View>
  );
};
