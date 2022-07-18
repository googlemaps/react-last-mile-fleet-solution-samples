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
import { StyleSheet, View } from 'react-native';
import TaskInformation from './TaskInformation';
import OptionsComponent from './UI/OptionsComponent';
import TrackingIdComponent from './TrackingIdComponent';
import {
  PROVIDER_URL, PROVIDER_PROJECT_ID, DEFAULT_POLLING_INTERVAL_MS,
  DEFAULT_MAP_OPTIONS
} from '../utils/consts';

interface TaskModel {
  status?: string,
  type?: string,
  outcome?: string,
  numStops?: number,
  estimatedCompletionTime?: Date,
  journeySegments?: google.maps.journeySharing.VehicleWaypoint[] | null,
};

interface MapOptionsModel {
  showAnticipatedRoutePolyline: boolean,
  showTakenRoutePolyline: boolean,
};

const MapComponent = () => {
  const ref = useRef();
  const trackingId = useRef<string>();
  const locationProvider = useRef<google.maps.journeySharing.FleetEngineShipmentLocationProvider>();
  const [error, setError] = useState<string | undefined>();
  const [mapOptions, setMapOptions] = useState<MapOptionsModel>({
    showAnticipatedRoutePolyline: true,
    showTakenRoutePolyline: true
  });
  const [task, setTask] = useState<TaskModel>({
    status: '',
    type: '',
    outcome: '',
    numStops: 0,
    estimatedCompletionTime: new Date(),
    journeySegments: [],
  });

  const setTrackingId = (newTrackingId) => {
    trackingId.current = newTrackingId;
    if (locationProvider.current) locationProvider.current.trackingId = newTrackingId;
  };

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

  useEffect(() => {
    locationProvider.current = new google.maps.journeySharing.FleetEngineShipmentLocationProvider({
      projectId: PROVIDER_PROJECT_ID,
      authTokenFetcher,
      trackingId: trackingId.current,
      pollingIntervalMillis: DEFAULT_POLLING_INTERVAL_MS,
    });

    locationProvider.current.addListener('error', (e: google.maps.ErrorEvent) => {
      setError(e.error.message);
    });

    locationProvider.current.addListener('update', (e: google.maps.journeySharing.FleetEngineShipmentLocationProviderUpdateEvent) => {
      if (e.task) {
        setTask({
          status: e.task?.status,
          type: e.task?.type,
          outcome: e.task?.outcome,
          numStops: e.task?.remainingVehicleJourneySegments?.length,
          estimatedCompletionTime: e.task?.estimatedCompletionTime,
          journeySegments: e.task?.remainingVehicleJourneySegments,
        });
        setError(undefined);
      };
    });
  }, []);

  useEffect(() => {
    if (locationProvider.current) locationProvider.current.reset();

    const mapViewOptions: google.maps.journeySharing.JourneySharingMapViewOptions = {
      element: ref.current,
      locationProvider: locationProvider.current,
      anticipatedRoutePolylineSetup: ({ defaultPolylineOptions }) => {
        return {
          polylineOptions: defaultPolylineOptions,
          visible: mapOptions.showAnticipatedRoutePolyline,
        };
      },
      takenRoutePolylineSetup: ({ defaultPolylineOptions }) => {
        return {
          polylineOptions: defaultPolylineOptions,
          visible: mapOptions.showTakenRoutePolyline,
        };
      }
    };

    const mapView = new google.maps.journeySharing.JourneySharingMapView(
      mapViewOptions
    );

    // Provide default zoom & center so the map loads even if trip ID is bad or stale.
    mapView.map.setOptions(DEFAULT_MAP_OPTIONS);
  }, [mapOptions]);

  return (
    <View>
      <TrackingIdComponent setTrackingId={setTrackingId} />
      <View style={styles.container}>
        <View style={styles.stack}>
          <OptionsComponent setMapOptions={setMapOptions} />
          <TaskInformation style={styles.info} error={error} task={task} trackingId={trackingId} />
        </View>
        <View style={styles.mapContainer}>
          <View style={styles.map} ref={ref} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  map: {
    height: '75vh',
  },
  mapContainer: {
    display: 'flex',
    width: '60%',
    marginRight: 20,
  },
  header: {
    fontSize: '2em',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  info: {
    marginTop: 30,
    marginBottom: 10,
  },
  stack: {
    display: 'flex',
    marginLeft: 15,
    width: '30%',
    flex: 1,
    flexDirection: 'column',
  }
});

export default MapComponent;
