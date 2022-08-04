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
import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';
import CheckBoxComponent from './CheckBoxComponent';

const OptionsComponent = ({ setMapOptions }) => {
  const [showAnticipatedRoutePolyline, setAnticipatedRoutePolyline] =
    useState<boolean>(true);
  const [showTakenRoutePolyline, setTakenRoutePolyline] =
    useState<boolean>(true);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isOptionsChanged, setIsOptionsChanged] = useState<boolean>(false);

  const applyButtonPressHandler = () => {
    setIsOptionsChanged(false);
    setModalVisible(!modalVisible);
    setMapOptions({
      showAnticipatedRoutePolyline: showAnticipatedRoutePolyline,
      showTakenRoutePolyline: showTakenRoutePolyline,
    });
  };

  const applyButtonStyleHandler = () => {
    if (isOptionsChanged) {
      return {
        marginLeft: 10,
        backgroundColor: '#2460ad',
        padding: 5,
        width: 50,
        borderRadius: 2,
      };
    }

    return {
      marginLeft: 10,
      backgroundColor: '#A9A9A9',
      padding: 5,
      width: 50,
      borderRadius: 2,
      cursor: 'not-allowed',
    };
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.optionsText}>Options</Text>
      </Pressable>

      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>
              <Text style={styles.header}>Polyline visibility</Text>
              <View style={styles.checkboxContainer}>
                <CheckBoxComponent
                  label={'Show Anticipated Route Polyline'}
                  setRoute={setAnticipatedRoutePolyline}
                  option={showAnticipatedRoutePolyline}
                  setIsOptionsChanged={setIsOptionsChanged}
                />
                <CheckBoxComponent
                  label={'Show Taken Route Polyline'}
                  setRoute={setTakenRoutePolyline}
                  option={showTakenRoutePolyline}
                  setIsOptionsChanged={setIsOptionsChanged}
                />
              </View>
            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={styles.cancelbutton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.text}>Cancel</Text>
              </Pressable>
              <Pressable
                style={applyButtonStyleHandler}
                onPress={applyButtonPressHandler}
                disabled={!isOptionsChanged}
              >
                <Text style={styles.applytext}>Apply</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e8e8e8',
    borderWidth: 1,
    padding: 5,
    width: 70,
    borderRadius: 5,
  },
  applybutton: {
    marginLeft: 10,
    backgroundColor: '#2460ad',
    padding: 5,
    width: 50,
    borderRadius: 2,
  },
  cancelbutton: {
    marginLeft: 10,
    backgroundColor: '#e8e8e8',
    borderWidth: 1,
    padding: 5,
    width: 50,
    borderRadius: 2,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
  applytext: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  optionsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    marginTop: 85,
    marginLeft: 70,
  },
  modalView: {
    width: 400,
    margin: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 25,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default OptionsComponent;
