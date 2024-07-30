import {BaseState, ColorScheme} from './types';
import {useTheme} from '@shopify/restyle';
import {AnimatedPressable, Box, Text} from '.';
import {Theme} from '../temp/theme';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {LoadingIndicator} from './LoadingIndicator';
import {customTokens} from './tokens';

export type ButtonSize = 'l' | 'm' | 's';
export type ButtonState = BaseState | 'loading';

export interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'primary-alt' | 'secondary' | 'tertiary';
  state?: ButtonState;
  size?: ButtonSize;
  behavior?: 'hug-content' | 'fill-container';
  colorScheme?: ColorScheme;
  enhancer?: 'default' | 'critical';
  accessibilityLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  onPress: _onPress,
  behavior = 'fill-container',
  size = 'l',
  state = 'enabled',
  colorScheme = 'light',
  enhancer,
  accessibilityLabel = `Button (${label})`,
}) => {
  const {sizing, borderWidths, borderRadius, colors, spacing, motion, opacity} =
    useTheme<Theme>();

  const isLoading = variant !== 'tertiary' && state === 'loading';
  const isLightColorScheme = colorScheme === 'light';

  const onPress = () => {
    if (state === 'enabled') {
      _onPress();
    }
  };

  const getStyles = useCallback(() => {
    // primary button does not support size s
    if (variant === 'primary' && size === 's') {
      // Override size `s` with `m` always
      // eslint-disable-next-line react-hooks/exhaustive-deps
      size = 'm';
    }

    let backgroundColor;
    if (state === 'disabled') {
      if (variant === 'tertiary') {
        backgroundColor = 'transparent';
      } else {
        backgroundColor = isLightColorScheme
          ? colors.lightBgDisabled
          : colors.darkBgDisabled;
      }
    } else {
      if (variant === 'primary') {
        backgroundColor = isLightColorScheme
          ? colors.lightBgAccentAltPrimary
          : colors.darkBgAccentTertiary;
      } else if (variant === 'primary-alt') {
        backgroundColor = isLightColorScheme
          ? colors.lightBgInteractive
          : colors.darkBgInteractive;
      } else {
        backgroundColor = 'transparent';
      }
    }

    let pressedBackgroundColor;
    if (variant === 'primary') {
      pressedBackgroundColor = isLightColorScheme
        ? colors.lightBgAccentAltPrimary
        : colors.darkBgAccentTertiary;
    } else if (variant === 'primary-alt') {
      pressedBackgroundColor = isLightColorScheme
        ? colors.lightBgPressedA
        : colors.darkBgPressedA;
    } else if (variant === 'secondary') {
      pressedBackgroundColor = isLightColorScheme
        ? colors.lightBgPressedB
        : colors.darkBgPressedB;
    }

    let borderColor: keyof Theme['colors'] = 'lightBorderSecondary';
    if (state === 'disabled') {
      if (variant === 'tertiary') {
        borderColor = isLightColorScheme
          ? 'lightBorderSecondary'
          : 'darkBorderSecondary';
      }
    } else {
      if (variant !== 'primary' && variant !== 'primary-alt') {
        if (variant === 'tertiary' && enhancer === 'critical') {
          borderColor = 'lightBorderError';
        } else {
          borderColor = isLightColorScheme
            ? 'lightBorderPrimary'
            : 'darkBorderPrimary';
        }
      }
    }

    let borderWidth;
    if (state !== 'disabled' && variant === 'secondary') {
      borderWidth = borderWidths.default;
    }

    let textColor: keyof Theme['colors'];
    if (state === 'disabled') {
      textColor = isLightColorScheme
        ? 'lightContentDisabled'
        : 'darkContentDisabled';
    } else {
      if (variant === 'primary') {
        textColor = isLightColorScheme
          ? 'lightContentInverseInteractive'
          : 'darkContentPrimary';
      } else if (variant === 'primary-alt') {
        textColor = isLightColorScheme
          ? 'lightContentInverseInteractive'
          : 'darkContentInverseInteractive';
      } else if (variant === 'tertiary' && enhancer === 'critical') {
        textColor = 'lightContentError';
      } else {
        textColor = isLightColorScheme
          ? 'lightContentPrimary'
          : 'darkContentPrimary';
      }
    }

    let loadingIndicatorColor: string;
    if (variant === 'primary') {
      loadingIndicatorColor = isLightColorScheme
        ? colors.lightContentInverseInteractive
        : colors.darkContentPrimary;
    } else if (variant === 'primary-alt') {
      loadingIndicatorColor = isLightColorScheme
        ? colors.lightContentInverseInteractive
        : colors.darkContentInverseInteractive;
    } else {
      loadingIndicatorColor = isLightColorScheme
        ? colors.lightContentInteractive
        : colors.darkContentInteractive;
    }

    let textVariant: keyof Theme['textVariants'] = 'buttonLarge';
    if (size === 'l') {
      textVariant = 'buttonLarge';
    } else if (size === 'm') {
      textVariant = 'buttonMedium';
    } else {
      if (variant === 'tertiary') {
        textVariant = 'buttonSmall';
      } else {
        textVariant = 'buttonMedium';
      }
    }

    let innerHeight;
    if (variant !== 'tertiary') {
      if (size === 'l') {
        innerHeight = sizing.buttonHeightL;
      } else if (size === 'm') {
        innerHeight = sizing.buttonHeightM;
      } else {
        innerHeight = sizing.buttonHeightS;
      }
    }

    let paddingVertical;
    if (variant === 'tertiary') {
      paddingVertical = spacing.xxs;
    }
    if (variant === 'secondary' && size === 's') {
      paddingVertical = spacing.xxs;
    }

    return {
      backgroundColor,
      borderColor,
      borderWidth,
      innerHeight,
      pressedBackgroundColor,
      textColor,
      loadingIndicatorColor,
      textVariant,
      paddingVertical,
      outerHeight:
        size === 's' && variant === 'tertiary'
          ? customTokens.sizingTertiaryButtonHeightS
          : sizing.minimumTappableArea,
    };
  }, [borderWidths, colors, sizing, size, state, variant, isLightColorScheme]);

  const {
    backgroundColor,
    borderColor,
    borderWidth,
    innerHeight,
    outerHeight,
    pressedBackgroundColor,
    textColor,
    loadingIndicatorColor,
    textVariant,
    paddingVertical,
  } = getStyles();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        pressableContainerStyle: {
          width:
            behavior === 'fill-container' && variant !== 'tertiary'
              ? '100%'
              : undefined,
          height: outerHeight,
          alignSelf: 'center',
          justifyContent: 'center',
        },
        pressable: {
          justifyContent: 'center',
          alignItems: 'center',
          height: innerHeight,
          minWidth:
            variant === 'secondary'
              ? 90
              : variant !== 'tertiary'
              ? 120
              : undefined,
          paddingVertical,
          paddingHorizontal: variant !== 'tertiary' ? spacing.s : undefined,
          borderRadius: borderRadius.small,
          borderColor: colors[borderColor],
          borderWidth,
        },
        textContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: spacing.xxs,
          position: 'relative',
          // TODO hack for now, figure and refactor this later
          top: variant === 'secondary' && size === 's' ? 1 : 0,
        },
      }),
    [
      behavior,
      variant,
      outerHeight,
      innerHeight,
      paddingVertical,
      spacing,
      borderRadius,
      colors,
      borderColor,
      borderWidth,
      size,
    ],
  );

  const loadingTweener = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.timing(loadingTweener, {
        toValue: 1,
        useNativeDriver: true,
        duration: motion.durations.duration1,
        delay: motion.delays.delay2,
        easing: motion.easings.standardEffective,
      }).start();
    } else {
      Animated.timing(loadingTweener, {
        toValue: 0,
        useNativeDriver: true,
        duration: motion.durations.duration1,
        delay: motion.delays.delay2,
        easing: motion.easings.standardEffective,
      }).start();
    }
  }, [isLoading]);

  const contentOpacity = loadingTweener.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const contentScale = loadingTweener.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.48],
  });

  return (
    <AnimatedPressable
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      disabled={state === 'disabled' || state === 'loading'}
      containerStyle={styles.pressableContainerStyle}
      style={styles.pressable}
      animate={useMemo(
        () => pressed => {
          'worklet';

          return {
            scale: pressed ? 0.95 : 1,
            backgroundColor: pressed ? pressedBackgroundColor : backgroundColor,
          };
        },
        [backgroundColor, pressedBackgroundColor],
      )}>
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: contentOpacity,
            transform: [{scale: contentScale}],
          },
        ]}>
        <Box
          borderBottomWidth={
            variant === 'tertiary' ? borderWidths.default : undefined
          }
          borderColor={borderColor}>
          <Text variant={textVariant} color={textColor}>
            {label}
          </Text>
        </Box>
      </Animated.View>
      <LoadingIndicator
        show={isLoading}
        color={loadingIndicatorColor}
        size={size}
      />
    </AnimatedPressable>
  );
};

export default Button;
