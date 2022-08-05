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
import { Picker } from '@react-native-picker/picker';

interface Props {
  label: string;
  setIcon: (iconName: string) => void;
  option: string;
  setIsOptionsChanged: (isOptionsChanged: boolean) => void;
}

const DropDown: React.FC<Props> = ({
  label,
  setIcon,
  option,
  setIsOptionsChanged,
}) => {
  return (
    <View style={styles.dropdown}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        style={styles.containerStyle}
        itemStyle={styles.label}
        selectedValue={option}
        onValueChange={(value) => {
          setIsOptionsChanged(true);
          setIcon(value);
        }}
      >
        <Picker.Item label="Default" value="USE_DEFAULT" />
        <Picker.Item label="Orange Pin" value="ORANGE_PIN" />
        <Picker.Item label="Green Arrow" value="GREEN_ARROW" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  containerStyle: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  label: {
    fontSize: 15,
  },
});

export default DropDown;
