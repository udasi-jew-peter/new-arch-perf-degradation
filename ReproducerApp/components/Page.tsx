import {useTheme} from '@shopify/restyle';
import {default as React, RefAttributes, useContext, useRef} from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  StatusBar,
} from 'react-native';
import {Theme} from '../temp/theme';
import {Box, SafeTopSpace} from './Foundation';
import {_Page} from './_Page';

type PageColorScheme = 'lightA' | 'lightB' | 'dark';

type PageSize = 'immersive' | 'default';

export interface PageProps {
  pageSize?: PageSize;
  colorScheme?: PageColorScheme;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  dockedFooter?: React.ReactNode;
  children?: React.ReactNode;
  scrollViewConfig?: ScrollViewProps;
}

export interface PageWithoutScrollProps {
  pageSize?: PageSize;
  colorScheme?: PageColorScheme;
  children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({
  pageSize = 'default',
  refreshControl,
  dockedFooter,
  scrollViewConfig,
  ...props
}) => {
  const {colorScheme = 'lightB', children} = props;

  const {colors} = useTheme<Theme>();

  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
  };

  let bgColor: keyof Theme['colors'];
  if (colorScheme === 'dark') {
    bgColor = 'darkBgPrimaryA';
  } else if (colorScheme === 'lightA') {
    bgColor = 'lightBgPrimaryA';
  } else {
    bgColor = 'lightBgPrimaryB';
  }

  return (
    <_Page {...props} pageSize={pageSize} scrollY={scrollY}>
      <ScrollView
        {...scrollViewConfig}
        onScroll={scrollHandler}
        style={{backgroundColor: colors[bgColor]}}
        refreshControl={refreshControl}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps>
        {children}
      </ScrollView>

      {dockedFooter}
    </_Page>
  );
};

export const PageWithoutScroll: React.FC<PageWithoutScrollProps> = ({
  pageSize = 'default',
  children,
  colorScheme,
}) => {
  const {colors} = useTheme<Theme>();

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
      <Box width="100%" flex={1} position="relative" bg={bgColor}>
        {pageSize === 'default' ? <SafeTopSpace /> : null}

        {children}
      </Box>
    </>
  );
};
