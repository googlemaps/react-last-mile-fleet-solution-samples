/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import MapComponent from './src/components/MapComponent';
import { API_KEY } from './src/utils/consts';

const render = (status: Status) => <Text>{status}</Text>;

const App = () => {

  return (
    <View>
      <Text style={styles.header}>React Native for the Web Sample App for Google Last Mile Fleet Solution</Text>
      <Wrapper apiKey={API_KEY} render={render} version={'beta'} libraries={['journeySharing']} >
        <MapComponent />
      </Wrapper>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  },
});

export default App;
