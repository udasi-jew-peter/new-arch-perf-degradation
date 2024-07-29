import {useTheme} from '@shopify/restyle';
import React, {useContext} from 'react';
import {Animated, StatusBar} from 'react-native';
import {Theme} from '../temp/theme';
import {Box, SafeTopSpace} from './Foundation';
import {PageProps} from './Page';

export interface _PageProps extends PageProps {
  scrollY: Animated.Value;
}

export const _Page: React.FC<_PageProps> = ({
  children,
  colorScheme,
  pageSize,
  scrollY,
}) => {
  const {borderWidths, colors} = useTheme<Theme>();

  // If system banner is there, override the status bar color, else same as header color
  let statusBarColor: keyof Theme['colors'];
  let bgColor: keyof Theme['colors'];
  if (colorScheme === 'dark') {
    bgColor = 'darkBgPrimaryA';
  } else if (colorScheme === 'lightA') {
    bgColor = 'lightBgPrimaryA';
  } else {
    bgColor = 'lightBgPrimaryB';
  }

  return (
    <>
      <StatusBar
        backgroundColor={colors.lightBgPrimaryA}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        translucent={true}
      />
      <Box width="100%" flex={1} bg={bgColor}>
        {pageSize === 'default' ? <SafeTopSpace /> : null}

        <Box position="relative" flex={1} bg={bgColor}>
          {children}
        </Box>
      </Box>
    </>
  );
};
