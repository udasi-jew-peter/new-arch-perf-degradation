import {createBox, createText} from '@shopify/restyle';
import React, {memo} from 'react';
import {Theme} from '../temp/theme';

export const Box = createBox<Theme>();

export const Text = createText<Theme>();

export const SafeTopSpace = memo(() => {
  return <Box height={36} />;
});
