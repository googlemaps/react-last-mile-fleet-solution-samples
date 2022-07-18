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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import MapComponent from './src/components/MapComponent';
import { API_KEY } from './src/utils/consts';

const render = (status: Status) => <Text>{status}</Text>;

const App = () => {

  return (
    <View style={styles.appcontent}>
      <Text style={styles.header}>
        React Native for Web Sample App for Google Last Mile Fleet Solution
      </Text>
      <Wrapper apiKey={API_KEY} render={render} version={'beta'} libraries={['journeySharing']}>
        <MapComponent />
      </Wrapper>
    </View>
  )
};

const styles = StyleSheet.create({
  appcontent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    flexWrap: 'wrap',
  },
  header: {
    fontSize: '1.75em',
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
    marginHorizontal: 10,
    flexWrap: 'wrap',
  }
});

export default App;
