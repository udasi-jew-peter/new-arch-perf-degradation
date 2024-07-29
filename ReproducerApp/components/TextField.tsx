import {customTokens} from './tokens';
import {InputState} from './types';
import {useTheme} from '@shopify/restyle';
import {Box, Text} from '.';
import {Theme} from '../temp/theme';
import React, {RefObject, useCallback, useMemo, useState} from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import {MotiText, MotiView} from 'moti';

export type TextInputRef = RefObject<TextInput>;

export interface TextFieldProps {
  label: string;
  value?: string;
  state?: InputState;
  leadingText?: string;
  trailingText?: string;
  showCount?: boolean;
  maxCharacters?: number;
  pattern?: RegExp;
  onChangeValue: (text: string) => void;
}

const TEXT_FIELD_DEFAULT_MAX_CHARACTERS = 255;

const TextField = React.forwardRef<
  TextInput,
  Omit<
    TextInputProps,
    'onChange' | 'onChangeText' | 'style' | 'value' | 'maxLength'
  > &
    TextFieldProps
>(
  (
    {
      label,
      value,
      state = 'enabled',
      leadingText,
      pattern,
      trailingText,
      showCount,
      maxCharacters = TEXT_FIELD_DEFAULT_MAX_CHARACTERS,
      onChangeValue,
      onBlur: _onBlur,
      onFocus: _onFocus,
      onPressIn: _onPressIn,
      onPressOut: _onPressOut,
      ...textInputProps
    },
    _ref,
  ) => {
    const inputRef = _ref as TextInputRef | undefined;
    const [isFocused, setIsFocused] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const {borderRadius, colors, textVariants, spacing, borderWidths, motion} =
      useTheme<Theme>();

    const isFilled = value !== '' && !!value;
    const isFilledOrFocused = isFilled || isFocused;
    const isFocusedAndFilled = isFocused && isFilled;
    const isDisabled = state === 'disabled';

    const handleChange = (input: string) => {
      const newValueInput = input;
      const oldValueInput = value ?? '';

      if (
        !pattern ||
        newValueInput === '' ||
        pattern.test(`${newValueInput}`)
      ) {
        onChangeValue(newValueInput);
      } else {
        onChangeValue(oldValueInput);
      }
    };

    const getStyles = useCallback(() => {
      let borderColor: keyof Theme['colors'];
      if (state === 'success') {
        borderColor = 'lightBorderSuccess';
      } else if (state === 'error') {
        borderColor = 'lightBorderError';
      } else {
        borderColor = isFocused ? 'lightBorderPrimary' : 'lightBorderSecondary';
      }

      return {borderColor};
    }, [state, isFocused]);

    const {borderColor} = getStyles();

    const styles = useMemo(
      () =>
        StyleSheet.create({
          input: {
            ...textVariants.bodyLarge,
            color: colors.lightContentPrimary,
            padding: 0,
            paddingBottom: Platform.OS === 'ios' ? spacing.xxs : 0,
            flex: 1,
            marginRight: spacing.xxs,
          },
          label: {
            color: colors.lightContentSecondary,
            position: isFilledOrFocused ? 'relative' : 'absolute',
          },
          container: {
            borderRadius: borderRadius.small,
            paddingLeft: spacing.s,
            height: customTokens.sizingTextFieldHeight,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: isDisabled
              ? colors.lightBgDisabled
              : colors.lightBgPrimaryB,
          },
        }),
      [
        borderRadius,
        colors,
        isDisabled,
        spacing,
        textVariants,
        isFilledOrFocused,
      ],
    );

    const onPressIn = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
      setIsPressed(true);
      _onPressIn?.(e);
    };

    const onPressOut = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
      setIsPressed(false);
      _onPressOut?.(e);
    };

    return (
      <Box width="100%">
        <MotiView
          style={styles.container}
          animate={{
            scale: !isFilled && isPressed ? 0.95 : 1,
            borderWidth: isFocused ? borderWidths.focus : borderWidths.default,
            borderColor: colors[borderColor],
          }}
          // @ts-ignore
          transition={{
            duration: motion.durations.duration0,
            type: 'timing',
          }}>
          <Box flex={1} justifyContent="center">
            <MotiText
              animate={{
                ...(isFilledOrFocused
                  ? textVariants.labelSmall
                  : textVariants.labelLarge),
              }}
              // @ts-ignore
              transition={{
                duration: motion.durations.duration0,
                type: 'timing',
              }}
              style={styles.label}>
              {label}
            </MotiText>

            <Box flexDirection={'row'} alignItems={'center'}>
              {isFilledOrFocused && leadingText ? (
                <Text
                  variant={'bodyLarge'}
                  color={'lightContentSecondary'}
                  mr="xxs">
                  {leadingText}
                </Text>
              ) : null}
              <TextInput
                accessibilityLabel={`Text Field ${label}`}
                {...textInputProps}
                ref={inputRef}
                onFocus={e => {
                  _onFocus?.(e);
                  setIsFocused(true);
                }}
                onBlur={e => {
                  _onBlur?.(e);
                  setIsFocused(false);
                }}
                style={styles.input}
                value={value}
                onChangeText={input => handleChange(input)}
                editable={!isDisabled}
                maxLength={maxCharacters}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                cursorColor={colors.lightContentInteractive}
                // Cursor color only works on Android, using this hack to give selection color in iOS
                // If selection color is given in Android, it will be used exactly for selection color while
                // iOS uses a lighter opacity version of same color.
                //
                // Setting this to `undefined` in Android as the text color and selection color will be close
                // making it harder to read
                selectionColor={
                  Platform.OS === 'ios'
                    ? colors.lightContentInteractive
                    : undefined
                }
              />
              {isFilledOrFocused && trailingText ? (
                <Text
                  variant={'bodyLarge'}
                  color={'lightContentSecondary'}
                  mr="xxs">
                  {trailingText}
                </Text>
              ) : null}
            </Box>
          </Box>
        </MotiView>
        <Box
          mt="xxs"
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}>
          {showCount ? (
            <Box pl={'s'} py="xxs">
              <Text variant="labelSmall" color="lightContentSecondary">
                {value?.length ?? 0}/{maxCharacters}
              </Text>
            </Box>
          ) : null}
        </Box>
      </Box>
    );
  },
);

export default TextField;
