import {createTheme} from '@shopify/restyle';
import * as tokens from './tokens';
import {Platform} from 'react-native';
import {Easing} from 'react-native-reanimated';

export const generateEasing = (easing: number[]) => {
  if (easing.length < 4) {
    throw new Error("Missing Value: Easing doesn't have 4 values.");
  }

  return Easing.bezier(
    easing[0] ?? 0,
    easing[1] ?? 0,
    easing[2] ?? 0,
    easing[3] ?? 0,
  );
};

export const transformThemeTypographyToken = (input: any) => {
  return {
    ...input,
    fontWeight: Platform.OS === 'android' ? undefined : input.fontWeight,
  };
};

const palette = {
  // Light
  // Background
  lightBgPrimaryA: tokens.colorLightBgPrimaryA,
  lightBgPrimaryB: tokens.colorLightBgPrimaryB,
  lightBgSecondaryA: tokens.colorLightBgSecondaryA,
  lightBgSecondaryB: tokens.colorLightBgSecondaryB,
  lightBgTertiary: tokens.colorLightBgTertiary,
  lightBgAccentPrimary: tokens.colorLightBgAccentPrimary,
  lightBgAccentSecondary: tokens.colorLightBgAccentSecondary,
  lightBgDisabled: tokens.colorLightBgDisabled,
  lightBgInteractive: tokens.colorLightBgInteractive,
  lightBgPressedA: tokens.colorLightBgPressedA,
  lightBgPressedB: tokens.colorLightBgPressedB,
  lightBgSuccessPrimary: tokens.colorLightBgSuccessPrimary,
  lightBgSuccessSecondary: tokens.colorLightBgSuccessSecondary,
  lightBgSuccessTertiary: tokens.colorLightBgSuccessTertiary,
  lightBgInfoPrimary: tokens.colorLightBgInfoPrimary,
  lightBgInfoSecondary: tokens.colorLightBgInfoSecondary,
  lightBgIntermediatePrimary: tokens.colorLightBgIntermediatePrimary,
  lightBgIntermediateSecondary: tokens.colorLightBgIntermediateSecondary,
  lightBgErrorPrimary: tokens.colorLightBgErrorPrimary,
  lightBgErrorSecondary: tokens.colorLightBgErrorSecondary,
  lightBgErrorTertiary: tokens.colorLightBgErrorTertiary,
  lightBgAccentAltPrimary: tokens.colorLightBgAccentAltPrimary,
  lightBgAccentAltSecondary: tokens.colorLightBgAccentAltSecondary,
  lightBgAccentAltTertiary: tokens.colorLightBgAccentAltTertiary,

  // Border
  lightBorderPrimary: tokens.colorLightBorderPrimary,
  lightBorderSecondary: tokens.colorLightBorderSecondary,
  lightBorderTertiary: tokens.colorLightBorderTertiary,
  lightBorderSuccess: tokens.colorLightBorderSuccess,
  lightBorderError: tokens.colorLightBorderError,

  // Content
  lightContentPrimary: tokens.colorLightContentPrimary,
  lightContentSecondary: tokens.colorLightContentSecondary,
  lightContentAccent: tokens.colorLightContentAccent,
  lightContentDisabled: tokens.colorLightContentDisabled,
  lightContentInteractive: tokens.colorLightContentInteractive,
  lightContentInverseInteractive: tokens.colorLightContentInverseInteractive,
  lightContentSuccess: tokens.colorLightContentSuccess,
  lightContentInfo: tokens.colorLightContentInfo,
  lightContentIntermediate: tokens.colorLightContentIntermediate,
  lightContentError: tokens.colorLightContentError,

  // Dark
  // Background
  darkBgPrimaryA: tokens.colorDarkBgPrimaryA,
  darkBgPrimaryB: tokens.colorDarkBgPrimaryB,
  darkBgSecondaryA: tokens.colorDarkBgSecondaryA,
  darkBgSecondaryB: tokens.colorDarkBgSecondaryB,
  darkBgTertiary: tokens.colorDarkBgTertiary,
  darkBgAccentPrimary: tokens.colorDarkBgAccentPrimary,
  darkBgAccentSecondary: tokens.colorDarkBgAccentSecondary,
  darkBgAccentTertiary: tokens.colorDarkBgAccentTertiary,
  darkBgPressedA: tokens.colorDarkBgPressedA,
  darkBgPressedB: tokens.colorDarkBgPressedB,
  darkBgDisabled: tokens.colorDarkBgDisabled,
  darkBgInteractive: tokens.colorDarkBgInteractive,

  // Border
  darkBorderPrimary: tokens.colorDarkBorderPrimary,
  darkBorderSecondary: tokens.colorDarkBorderSecondary,
  darkBorderTertiary: tokens.colorDarkBorderTertiary,

  // Content
  darkContentPrimary: tokens.colorDarkContentPrimary,
  darkContentSecondary: tokens.colorDarkContentSecondary,
  darkContentAccent: tokens.colorDarkContentAccent,
  darkContentDisabled: tokens.colorDarkContentDisabled,
  darkContentInteractive: tokens.colorDarkContentInteractive,
  darkContentInverseInteractive: tokens.colorDarkContentInverseInteractive,
  darkContentSuccess: tokens.colorDarkContentSuccess,
  darkContentIntermediate: tokens.colorDarkContentIntermediate,
  darkContentError: tokens.colorDarkContentError,

  // Utils
  transparent: '#00000000',
};

const theme = createTheme({
  colors: palette,
  spacing: {
    zero: 0,
    xxs: tokens.spacingXxs, // 4
    xs: tokens.spacingXs, // 8
    s: tokens.spacingS, // 16
    m: tokens.spacingM, // 24
    l: tokens.spacingL, // 32
    xl: tokens.spacingXl, // 48
    xxl: tokens.spacingXxl, // 64
    pageMargin: tokens.spacingPageMargin, // 20
  },
  textVariants: {
    headingXSmall: transformThemeTypographyToken(
      tokens.typographyHeadingXSmall,
    ),
    headingSmall: transformThemeTypographyToken(tokens.typographyHeadingSmall),
    headingMedium: transformThemeTypographyToken(
      tokens.typographyHeadingMedium,
    ),
    headingLarge: transformThemeTypographyToken(tokens.typographyHeadingLarge),
    headingXLarge: transformThemeTypographyToken(
      tokens.typographyHeadingXLarge,
    ),
    headingXxLarge: transformThemeTypographyToken(
      tokens.typographyHeadingXxLarge,
    ),
    bodySmall: transformThemeTypographyToken(tokens.typographyBodySmall),
    bodyMedium: transformThemeTypographyToken(tokens.typographyBodyMedium),
    bodyLarge: transformThemeTypographyToken(tokens.typographyBodyLarge),
    labelSmall: transformThemeTypographyToken(tokens.typographyLabelSmall),
    labelMedium: transformThemeTypographyToken(tokens.typographyLabelMedium),
    labelLarge: transformThemeTypographyToken(tokens.typographyLabelLarge),
    buttonLarge: transformThemeTypographyToken(tokens.typographyButtonLarge),
    buttonMedium: transformThemeTypographyToken(tokens.typographyButtonMedium),
    buttonSmall: transformThemeTypographyToken(tokens.typographyButtonSmall),
    numberLarge: transformThemeTypographyToken(tokens.typographyNumberLarge),
    numberMedium: transformThemeTypographyToken(tokens.typographyNumberMedium),
  },
  borderRadius: {
    small: tokens.borderRadiusSmall, // 4
    medium: tokens.borderRadiusMedium, // 8
    large: tokens.borderRadiusLarge, // 16
    circular: tokens.borderRadiusCircular, // infinite
  },
  opacity: {
    almostTransparent: tokens.opacityAlmostTransparent, // 0.05
    veryTransparent: tokens.opacityVeryTransparent, // 0.24
    semiTransparent: tokens.opacitySemiTransparent, // 0.48
    slightlyTransparent: tokens.opacitySlightlyTransparent, // 0.72
  },
  sizing: {
    iconXs: tokens.sizingIconXs, // 12
    iconS: tokens.sizingIconS, // 16
    iconM: tokens.sizingIconM, // 24
    iconL: tokens.sizingIconL, // 32
    iconXl: tokens.sizingIconXl, // 36
    buttonHeightXs: tokens.sizingButtonHeightXs, // 24
    buttonHeightS: tokens.sizingButtonHeightS, // 32
    buttonHeightM: tokens.sizingButtonHeightM, // 40
    buttonHeightL: tokens.sizingButtonHeightL, // 48
    artworkXs: tokens.sizingArtworkXs, // 16
    artworkS: tokens.sizingArtworkS, // 24
    artworkM: tokens.sizingArtworkM, // 32
    artworkMl: tokens.sizingArtworkMl, // 36
    artworkL: tokens.sizingArtworkL, // 40
    artworkXl: tokens.sizingArtworkXl, // 48
    artwork2xl: tokens.sizingArtwork2xl, // 64
    artwork3xl: tokens.sizingArtwork3xl, // 96
    artwork4xl: tokens.sizingArtwork4xl, // 128
    artwork5xl: tokens.sizingArtwork5xl, // 128
    artwork6xl: tokens.sizingArtwork6xl,
    minimumTappableArea: tokens.sizingMinTappableArea, // 48
  },
  borders: {
    input: tokens.borderInput, // { color: colors.lightBorderPrimary, width: 1 }
    inputFocus: tokens.borderInputFocus, // { color: colors.lightBorderPrimary, width: 2 }
    card: tokens.borderCard, // { color: colors.lightBorderTertiary, width: 3 }
  },
  borderWidths: {
    default: tokens.borderWidthDefault, // 1
    focus: tokens.borderWidthFocus, // 2
    card: tokens.borderWidthCard, // 3
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  motion: {
    durations: {
      duration0: tokens.motionDurationDuration0, // 100
      duration1: tokens.motionDurationDuration1, // 150
      duration2: tokens.motionDurationDuration2, // 200
      duration3: tokens.motionDurationDuration3, // 250
      duration4: tokens.motionDurationDuration4, // 300
      duration5: tokens.motionDurationDuration5, // 400
      duration6: tokens.motionDurationDuration6, // 600
      duration7: tokens.motionDurationDuration7, // 900
    },
    easings: {
      entranceEffective: generateEasing(tokens.motionEasingEntranceEffective), // 0, 0, 0.2, 1
      entranceRevealing: generateEasing(tokens.motionEasingEntranceRevealing), // 0, 0, 0.1, 1
      exitEffective: generateEasing(tokens.motionEasingExitEffective), // 0.2, 0, 1, 1
      exitRevealing: generateEasing(tokens.motionEasingExitRevealing), // 0.3, 0, 1, 1
      standardAttentive: generateEasing(tokens.motionEasingStandardAttentive), // 0.5, 0, 0.3, 1.3
      standardEffective: generateEasing(tokens.motionEasingStandardEffective), // 0.2, 0, 0.2, 1
      standardRevealing: generateEasing(tokens.motionEasingStandardRevealing), // 0.3, 0, 0.1, 1
    },
    delays: {
      delay0: tokens.motionDelayDelay0, // 100
      delay1: tokens.motionDelayDelay1, // 150
      delay2: tokens.motionDelayDelay2, // 200
      delay3: tokens.motionDelayDelay3, // 3000
      delay4: tokens.motionDelayDelay4, // 5000
    },
  },
});

export type Theme = typeof theme;
export default theme;
