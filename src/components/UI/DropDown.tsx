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
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({ label, setIcon, option }) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Use Default', value: 'USE_DEFAULT' },
        { label: 'Orange Pin', value: 'ORANGE_PIN' },
        { label: 'Green Arrow', value: 'GREEN_ARROW' }
    ]);

    return (
        <View style={styles.dropdown}>
            <Text style={styles.label}>{label}</Text>
            <DropDownPicker open={open} value={option} items={items} setOpen={setOpen}
                setValue={setIcon}
                setItems={setItems}
                showTickIcon={false}
                style={{ flexDirection: 'row' }}
                dropDownContainerStyle={{ backgroundColor: '#bab8b6' }}
                textStyle={{ fontSize: '0.9rem' }}
                containerStyle={styles.containerStyle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        marginLeft: 20,
        flexDirection: 'row',
    },
    containerStyle: {
        width: '45%',
        paddingLeft: 10,
        borderWidth: 0,
        marginLeft: 10,
        marginBottom: 10,
    },
    label: {
        fontSize: '1.1rem',
    }
});

export default DropDown;
