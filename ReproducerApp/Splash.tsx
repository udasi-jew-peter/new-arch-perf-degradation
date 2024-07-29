import {TextInput} from 'react-native-gesture-handler';
import {Button, Page, SectionHeading, Text, TextField} from './components';
import React, {useEffect, useState} from 'react';

const Splash = () => {
  const [state, setState] = useState<'enabled' | 'loading'>('enabled');
  const [input, setInput] = useState('');

  useEffect(() => {
    let timeout = null;
    if (state === 'loading') {
      timeout = setTimeout(() => {
        setState('enabled');
      }, 2000);
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [state]);

  return (
    <Page colorScheme="lightA">
      <SectionHeading title="Basic Section" />
      <Text variant="bodyMedium">Hello, World</Text>

      <SectionHeading title="Buttons Section" />
      <Button
        variant="primary"
        label="Click This Button"
        state={state}
        onPress={() => {
          console.log('See it works');
          setState('loading');
        }}
      />

      <SectionHeading title="Inputs Section" />
      <TextField
        label="Enter Something Man"
        onChangeValue={i => setInput(i)}
        value={input}
      />
      {/* <TextInput
        placeholder="Enter Something Man"
        onChangeText={e => setInput(e)}
        value={input}
      /> */}
    </Page>
  );
};

export default Splash;
