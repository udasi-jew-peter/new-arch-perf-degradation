import {BoxProps, useRestyle, useTheme} from '@shopify/restyle';
import {MotiPressableProps} from 'moti/interactions';
import React, {forwardRef, useEffect, useState} from 'react';
import {
  GestureResponderEvent,
  PressableProps,
  Pressable as RNPressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Theme} from '../temp/theme';
import {restyleFunctions} from './utils';

export const AnimatedPressable = forwardRef<
  typeof Pressable,
  PressableProps & {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    animate?: (pressed: boolean) => ViewStyle;
    containerStyle?: StyleProp<ViewStyle>;
  }
>(({children, containerStyle, style, animate, ...props}) => {
  const {motion} = useTheme<Theme>();

  const [isPressed, setIsPressed] = useState(false);

  // 0 meaning not pressed
  // 1 meaning pressed
  const stateTweener = useSharedValue(0);

  useEffect(() => {
    if (isPressed) {
      stateTweener.value = withTiming(1, {
        duration: motion.durations.duration0,
      });
    } else {
      stateTweener.value = withTiming(0, {
        duration: motion.durations.duration0,
      });
    }
  }, [isPressed, motion]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const customStyles = animate?.(isPressed) ?? {};

    return {
      transform: [{scale: interpolate(stateTweener.value, [0, 1], [1, 0.95])}],
      ...customStyles,
    };
  });

  return (
    <Pressable
      {...props}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      // @ts-ignore
      style={containerStyle}>
      <Animated.View style={[animatedContainerStyle, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
});

export const Pressable = forwardRef<
  View,
  BoxProps<Theme, true> & Omit<PressableProps, 'style'>
>(({children, onPress, ...props}, ref) => {
  // @ts-ignore
  const innerProps = useRestyle(restyleFunctions, props);
  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e);
    }
  };

  return (
    <RNPressable {...innerProps} onPress={handlePress} ref={ref}>
      {children}
    </RNPressable>
  );
});
