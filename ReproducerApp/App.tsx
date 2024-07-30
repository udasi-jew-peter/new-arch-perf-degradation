/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {StatusBar} from 'react-native';

import Splash from './Splash';
import theme from './temp/theme';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <Splash />
    </ThemeProvider>
  );
}

export default App;
