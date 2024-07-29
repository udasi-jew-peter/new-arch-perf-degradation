import {createBox} from '@shopify/restyle';
import {Theme} from '../temp/theme';
import {createText, TextProps} from '@shopify/restyle';
import {findNeedleInTheHaystack} from './utils';
import React, {memo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const Box = createBox<Theme>();

export const Text = createText<Theme>();

export const SafeTopSpace = memo(() => {
  const {top} = useSafeAreaInsets();
  return <Box height={top} />;
});
