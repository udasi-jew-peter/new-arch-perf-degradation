import {Platform} from 'react-native';
import {Theme} from '../temp/theme';

export const customTokens = {
  indeterminateIconHeight: 2,
  indeterminateIconWidth: 10,
  sizingSheetGrabber: 4,
  sizingSwitchHeight: 28,
  sizingRadioOff: 20,
  sizingRadioOn: 18,
  sizingSliderTrackHeight: 4,
  sizingSliderKnobGrillWidth: 2,
  radioBorderWidth: 5,
  spacingCheck: 2,
  sizingHeaderMinHeight: 48,
  sizingHeaderLeftEmptySpacer: 48,
  sizingHeaderRightEmptySpacer: 48,
  sizingTertiaryButtonHeightS: 24,
  sizingAvatarTileWidth: 76,
  sizingProgressVizUnfilledHeight: 1,
  sizingProgressVizFilledHeight: 4,
  sizingDeterminateProgressUnfilledHeight: 4,
  sizingDeterminateProgressFilledHeight: 4,
  spacingProgressVizTop: -1.5,
  sizingTextFieldHeight: 52,
  sizingTextAreaHeight: 84,
  sizingTextAreaFocusedInputHeight: 48,
  sizingTextAreaUnfocusedInputHeight: 68,
  sizingSearchFieldHeight: 52,
  datePickerDateItemSize: 32,
  monthItemWidth: 56,
  carouselIndicatorSize: 8,
  steppedProgressHeight: 4,
  sizingDropdownHeight: 52,
  sizingDropdownMenuHeight: 192,

  // Pill
  spacingPillMVertical: 6,
  sizingPillFixedWidth: 64,

  // Switch List Item
  spacingSwichListItemSmall: 2,

  // OTP Field
  otpInputWidth: 40,

  // Icon Tile
  sizingIconTileWidth: 76,
  sizingIconAreaWidth: 64,
  sizingIconAreaHeight: 64,
  zIndexHigh: 2,
  spacingIconTileTagTop: -7,

  // Content tabs
  tabBarItemHeight: 34,
  tabBarItemMargin: 12,
  opacityOpaque: 1,
  opacityTransparent: 0,

  // NudeAmountInput
  sizingNudeAmountInputMaxWidth: 240,
  nudeAmountFieldIOSLineHeight: 60,

  // Snackbar
  spacingSnackbarTopOffset: 80,

  // Amount & Nude Amount
  sizingNudeAmountHeight: 66,
  modifiersAmountM: 0.667,
  durationAmountCountUp: 350,

  // Icon Button
  sizingPrimaryIconButtonS: 32,
  sizingPrimaryIconButtonM: 40,

  // Tag
  spacingTagVertical: 6,
  spacingTagXsBottom: 2,

  // Text Input
  spacingTextInputLabel: 6,

  // MessageCard
  sizingVerticalMessageCardM: 180,
  sizingVerticalMessageCardL: 240,

  // Quick Switcher
  sizingQuickSwitcherMHeight: 28,
};

const iOSTokensScaleFactor = 1.08;
const iOSTokensUnscaleFactor = 1 / iOSTokensScaleFactor;

export const unscaleFonts = (textVariants: {
  [k in keyof Theme['textVariants']]: any;
}) => {
  if (Platform.OS === 'ios') {
    const scaledTextVariants = Object.entries(textVariants)
      // Flatten to array to iterate and modify
      .map(([key, obj]) => {
        return {
          [key]: {
            ...obj,
            fontSize: obj.fontSize * iOSTokensUnscaleFactor,
            lineHeight: obj.lineHeight
              ? obj.lineHeight * iOSTokensUnscaleFactor
              : undefined,
            letterSpacing: obj.letterSpacing
              ? obj.letterSpacing * iOSTokensUnscaleFactor
              : undefined,
          },
        };
      })
      // combine into object
      .reduce(
        (acc, obj) => ({...acc, [Object.keys(obj)[0]]: Object.values(obj)[0]}),
        {},
      );

    return scaledTextVariants;
  }
  return textVariants;
};

export const unscaleNumericTokens = (tokens: {[k: string]: number}) => {
  if (Platform.OS === 'ios') {
    const scaledTokens: typeof tokens = {};
    Object.entries(tokens).forEach(([key, value]) => {
      scaledTokens[key] = value * iOSTokensUnscaleFactor;
    });

    return scaledTokens;
  }

  return tokens;
};
