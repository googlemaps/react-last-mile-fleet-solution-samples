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

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TaskInformation from './TaskInformation';
import OptionsComponent from './UI/OptionsComponent';
import TrackingIdComponent from './TrackingIdComponent';
import { PROVIDER_URL, PROVIDER_PROJECT_ID, DEFAULT_POLLING_INTERVAL_MS, DEFAULT_MAP_OPTIONS } from "../utils/consts";


const MapComponent = () => {
  const ref = useRef();
  const trackingId = useRef('');
  const journeySharingMap = useRef();
  const [mapOptions, setMapOptions] = useState({});
  const [task, setTask] = useState({
    status: '',
    type: '',
    outcome: '',
    numStops: 0,
    estimatedCompletionTime: new Date(),
    journeySegments: [],
  });
  const [error, setError] = useState();

  const authTokenFetcher = async () => {
    const response = await fetch(
      `${PROVIDER_URL}/token/delivery_consumer/${trackingId.current}`
    );
    const responseJson = await response.json();

    return {
      token: responseJson.token,
      expiresInSeconds: 3300,
    };
  };

  const locationProvider = new google.maps.journeySharing.FleetEngineShipmentLocationProvider({
    projectId: PROVIDER_PROJECT_ID,
    authTokenFetcher,
    trackingId: trackingId.current,
    pollingIntervalMillis: DEFAULT_POLLING_INTERVAL_MS,
  });

  const setTrackingId = (newTrackingId) => {
    trackingId.current = newTrackingId;
    journeySharingMap.current.locationProvider.trackingId = newTrackingId;
    setError(undefined);
  }

  useEffect(() => {
    locationProvider.addListener('error', e => {
      setError(e.error.message);
    });

    locationProvider.addListener('update', e => {
      setTask((prev) => ({
        ...prev,
        status: e.task?.status,
        type: e.task?.type,
        outcome: e.task?.outcome,
        numStops: e.task?.remainingVehicleJourneySegments?.length,
        estimatedCompletionTime: e.task?.estimatedCompletionTime,
        journeySegments: e.task?.remainingVehicleJourneySegments,
      }))
    });

    journeySharingMap.current = new google.maps.journeySharing.JourneySharingMapView({
      element: ref.current,
      locationProvider,
      ...mapOptions
    });

    journeySharingMap.current.map.setOptions(DEFAULT_MAP_OPTIONS);
  }, [mapOptions]);

  return (
    <View>
      <View style={style.stack}>
        <OptionsComponent setMapOptions={setMapOptions} />
        <TrackingIdComponent setTrackingId={setTrackingId} />
        <Text style={style.heading}>Task information</Text>
        <TaskInformation style={style.infoBlock} error={error} task={task} trackingId={trackingId} />
      </View>
      <View style={style.map} ref={ref} />
    </View>
  )
}

const style = StyleSheet.create({
  map: {
    height: '87vh',
    width: '75%',
    position: 'absolute',
    right: 50,
  },
  infoBlock: {
    marginLeft: '30px',
    position: 'absolute',
    width: '25%',
    padding: '10px',
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginVertical: 30,
    marginLeft: 20,
  },
  stack: {
    marginLeft: 10,
    position: 'absolute',
    width: '25%',
    padding: 15,
  },
});

export default MapComponent;
