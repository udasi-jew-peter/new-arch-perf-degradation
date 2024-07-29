import {useTheme} from '@shopify/restyle';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Box, Button, Text} from '.';
import {Theme} from '../temp/theme';
import {ColorScheme} from './types';

export interface SectionHeadingProps {
  title: string;
  subText?: string;
  colorScheme?: ColorScheme;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subText,
  colorScheme = 'light',
}) => {
  const {spacing, sizing} = useTheme<Theme>();
  const rightActionVisible = false;
  const isLightColorScheme = colorScheme === 'light';

  const styles = StyleSheet.create({
    subtextStyle: {
      marginTop: rightActionVisible ? -spacing.xxs : undefined,
      width: rightActionVisible ? '70%' : undefined,
      paddingBottom: spacing.s,
    },
  });

  let containerHeight;
  if (rightActionVisible || (!rightActionVisible && !subText)) {
    containerHeight = sizing.minimumTappableArea;
  }

  return (
    <Box>
      <Box
        alignItems={'center'}
        width={'100%'}
        flexDirection={'row'}
        height={containerHeight}>
        <Box flex={1}>
          <Text
            pt={subText && !rightActionVisible ? 'xs' : undefined}
            variant={'headingMedium'}
            color={
              isLightColorScheme ? 'lightContentPrimary' : 'darkContentPrimary'
            }>
            {title}
          </Text>
        </Box>
      </Box>
      {subText ? (
        <Box style={styles.subtextStyle}>
          <Text
            variant={'bodyMedium'}
            color={
              isLightColorScheme ? 'lightContentPrimary' : 'darkContentPrimary'
            }>
            {subText}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};
export default SectionHeading;
