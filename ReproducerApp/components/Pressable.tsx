import {BoxProps, useRestyle, useTheme} from '@shopify/restyle';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  Animated,
  GestureResponderEvent,
  PressableProps,
  Pressable as RNPressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {Theme} from '../temp/theme';
import {restyleFunctions} from './utils';
import {Box} from './Foundation';

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
  const stateTweener = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPressed) {
      Animated.timing(stateTweener, {
        toValue: 1,
        duration: motion.durations.duration0,
        useNativeDriver: true,
      });
    } else {
      Animated.timing(stateTweener, {
        toValue: 0,
        duration: motion.durations.duration0,
        useNativeDriver: true,
      });
    }
  }, [isPressed, motion]);

  const customStyles = animate?.(isPressed);

  const animatedContainerStyle = {
    transform: [
      {
        scale: stateTweener.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.95],
        }),
      },
    ],
    ...customStyles,
  };

  return (
    <Pressable
      {...props}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}>
      <Box style={containerStyle}></Box>
      <Animated.View
        style={[animatedContainerStyle, style, customStyles ?? {}]}>
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
