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
import { View, StyleSheet, Text } from 'react-native';
import { CheckBox } from 'react-native-web';

const CheckBoxComponent = ({
  label,
  setRoute,
  option,
  setIsOptionsChanged,
}) => {
  const onValueChange = (value: boolean) => {
    setRoute(value);
    setIsOptionsChanged(true);
  };

  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        style={styles.checkbox}
        value={option}
        onValueChange={onValueChange}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'auto',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CheckBoxComponent;
