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

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const TaskIdComponent = ({ setTrackingId }) => {
  const [text, setText] = useState<string>();

  const onPress = () => setTrackingId(text);
  const onKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') onPress();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={'Tracking ID'}
        onChangeText={(text) => setText(text)}
        onKeyPress={onKeyPress}
      />
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Find</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    marginLeft: 15,
    padding: 7,
    width: 290,
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 12,
    borderRadius: 5,
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#2460ad',
    padding: 7,
    width: 50,
    borderRadius: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TaskIdComponent;
