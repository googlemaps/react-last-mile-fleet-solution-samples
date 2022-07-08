/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';
import DropDown from './DropDown';
import CheckBoxComponent from './CheckBoxComponent';
import { ICON_OPTIONS } from '../../utils/consts';

const OptionsComponent = ({ setMapOptions }) => {
  const [showAnticipatedRoute, setAnticipatedRoute] = useState(true);
  const [showTakenRoute, setTakenRoute] = useState(true);
  const [destinationIcon, setDestinationIcon] = useState('USE_DEFAULT');
  const [vehicleIcon, setVehicleICon] = useState('USE_DEFAULT');
  const [modalVisible, setModalVisible] = useState(false);

  const selectedMapOptions = {
    anticipatedRoutePolylineSetup: ({ defaultPolylineOptions }) => {
      return {
        polylineOptions: defaultPolylineOptions,
        visible: showAnticipatedRoute,
      };
    },
    takenRoutePolylineSetup: ({ defaultPolylineOptions }) => {
      return {
        polylineOptions: defaultPolylineOptions,
        visible: showTakenRoute,
      };
    },
    destinationMarkerSetup: ({ defaultMarkerOptions }) => {
      if (ICON_OPTIONS[destinationIcon] !== ICON_OPTIONS.USE_DEFAULT) {
        defaultMarkerOptions.icon = ICON_OPTIONS[destinationIcon].icon;
      }
      return { markerOptions: defaultMarkerOptions };
    },
    vehicleMarkerSetup: ({ defaultMarkerOptions }) => {
      if (ICON_OPTIONS[vehicleIcon] !== ICON_OPTIONS.USE_DEFAULT) {
        defaultMarkerOptions.icon = Object.assign(
          defaultMarkerOptions.icon,
          ICON_OPTIONS[vehicleIcon].icon
        );
      }
      return { markerOptions: defaultMarkerOptions };
    },
  };

  const pressHandler = () => {
    setMapOptions(selectedMapOptions);
  }

  return (
    <View>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.heading}>Options</Text>
      </Pressable>

      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={styles.container}>
                <Text style={{ fontSize: '1.1rem', marginBottom: 10 }}>Polyline visibility</Text>
                <View style={styles.checkboxContainer}>
                  <CheckBoxComponent label={'Show Anticipated Route Polyline'} setRoute={setAnticipatedRoute} option={showAnticipatedRoute} />
                  <CheckBoxComponent label={'Show Taken Route Polyline'} setRoute={setTakenRoute} option={showTakenRoute} />
                </View>
                <DropDown label={'Destination Icon:'} setIcon={setDestinationIcon} option={destinationIcon} />
                <DropDown label={'Vehicle Icon:'} setIcon={setVehicleICon} option={vehicleIcon} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'right' }}>
                <Pressable style={styles.applybutton} onPress={pressHandler}>
                  <Text style={styles.text}>Apply</Text>
                </Pressable>
                <Pressable style={styles.applybutton} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.text}>Close</Text>
                </Pressable>
              </View>
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
    marginBottom: 40,
  },
  checkboxContainer: {
    flexDirection: 'column',
    marginBottom: 15,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#e8e8e8',
    borderWidth: 1,
    padding: 5,
    marginLeft: 20,
    width: 80,
    borderRadius: 5,
  },
  applybutton: {
    marginLeft: 10,
    backgroundColor: '#e8e8e8',
    borderWidth: 1,
    padding: 5,
    width: 70,
    borderRadius: 2,
  },
  text: {
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
  },
  modalView: {
    width: 550,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default OptionsComponent;
