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
  const [text, setText] = useState();
  const onPress = () => setTrackingId(text);
  const onKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') onPress();
  };

  return (
    <View>
      <TextInput style={styles.input} placeholder={'Tracking ID'} onChangeText={text => setText(text)} onKeyPress={onKeyPress}/>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>Find</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginLeft: 25,
    marginBottom: 15,
    marginTop: 60,
    padding: 7,
    width: '75%',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: '0.8rem',
    margin: 'auto',
  },
  button: {
    marginLeft: 25,
    backgroundColor: '#2460ad',
    padding: 5,
    width: 70,
    borderRadius: 2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: '0.9rem',
    textAlign: 'center',
  }
});

export default TaskIdComponent;
