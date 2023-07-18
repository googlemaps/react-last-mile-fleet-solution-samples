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
  PROVIDER_URL,
  PROVIDER_PROJECT_ID,
  DEFAULT_POLLING_INTERVAL_MS,
  DEFAULT_MAP_OPTIONS,
  ICON_OPTIONS,
} from '../utils/consts';

export interface TaskModel {
  status: string | null;
  outcome: string | null;
  estimatedCompletionTime: Date | null;
  remainingStopCount: number | null;
}

export interface MapOptionsModel {
  showAnticipatedRoutePolyline: boolean;
  showTakenRoutePolyline: boolean;
  destinationMarker: {
    displayName: string;
    icon: google.maps.Symbol | null;
  };
  vehicleMarker: {
    displayName: string;
    icon: google.maps.Symbol | null;
  };
}

const MapComponent = () => {
  const ref = useRef(null);
  const trackingId = useRef<string>('');
  const locationProvider =
    useRef<google.maps.journeySharing.FleetEngineShipmentLocationProvider>();
  const [error, setError] = useState<string | undefined>();
  const mapOptions = useRef<MapOptionsModel>({
    showAnticipatedRoutePolyline: true,
    showTakenRoutePolyline: true,
    destinationMarker: ICON_OPTIONS.USE_DEFAULT,
    vehicleMarker: ICON_OPTIONS.USE_DEFAULT,
  });
  const [task, setTask] = useState<TaskModel>({
    status: null,
    outcome: null,
    estimatedCompletionTime: null,
    remainingStopCount: null,
  });

  const setTrackingId = (newTrackingId: string) => {
    trackingId.current = newTrackingId;
    if (locationProvider.current)
      locationProvider.current.trackingId = trackingId.current;
  };

  const setMapOptions = (newMapOptions: MapOptionsModel) => {
    mapOptions.current.showAnticipatedRoutePolyline =
      newMapOptions.showAnticipatedRoutePolyline;
    mapOptions.current.showTakenRoutePolyline =
      newMapOptions.showTakenRoutePolyline;
    mapOptions.current.destinationMarker = newMapOptions.destinationMarker;
    mapOptions.current.vehicleMarker = newMapOptions.vehicleMarker;
    setTrackingId(trackingId.current);
  };

  const authTokenFetcher = async () => {
    const response = await fetch(
      `${PROVIDER_URL}/token/delivery_consumer/${trackingId.current}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const responseJson = await response.json();

    return {
      token: responseJson.token,
      expiresInSeconds: 3300,
    };
  };

  useEffect(() => {
    locationProvider.current =
      new google.maps.journeySharing.FleetEngineShipmentLocationProvider({
        projectId: PROVIDER_PROJECT_ID,
        authTokenFetcher,
        trackingId: trackingId.current,
        pollingIntervalMillis: DEFAULT_POLLING_INTERVAL_MS,
        destinationMarkerCustomization: (
          params: google.maps.journeySharing.ShipmentMarkerCustomizationFunctionParams
        ) => {
          if (
            mapOptions.current.destinationMarker !== ICON_OPTIONS.USE_DEFAULT
          ) {
            params.marker.setIcon(mapOptions.current.destinationMarker.icon);
          }
        },

        deliveryVehicleMarkerCustomization: (
          params: google.maps.journeySharing.ShipmentMarkerCustomizationFunctionParams
        ) => {
          if (mapOptions.current.vehicleMarker !== ICON_OPTIONS.USE_DEFAULT) {
            params.marker.setIcon(mapOptions.current.vehicleMarker.icon);
          }
        },
      });

    locationProvider.current.addListener(
      'error',
      (e: google.maps.ErrorEvent) => {
        setError(e.error.message);
      }
    );

    locationProvider.current.addListener(
      'update',
      (
        e: google.maps.journeySharing.FleetEngineShipmentLocationProviderUpdateEvent
      ) => {
        if (e.taskTrackingInfo) {
          setTask({
            status: e.taskTrackingInfo.state,
            outcome: e.taskTrackingInfo.taskOutcome,
            estimatedCompletionTime:
              e.taskTrackingInfo.estimatedTaskCompletionTime,
            remainingStopCount: e.taskTrackingInfo.remainingStopCount,
          });
          setError(undefined);
        }
      }
    );

    const mapViewOptions: google.maps.journeySharing.JourneySharingMapViewOptions =
      {
        element: ref.current as unknown as Element,
        locationProvider: locationProvider.current,
        anticipatedRoutePolylineSetup: ({ defaultPolylineOptions }) => {
          return {
            polylineOptions: defaultPolylineOptions,
            visible: mapOptions.current.showAnticipatedRoutePolyline,
          };
        },
        takenRoutePolylineSetup: ({ defaultPolylineOptions }) => {
          return {
            polylineOptions: defaultPolylineOptions,
            visible: mapOptions.current.showTakenRoutePolyline,
          };
        },
      };

    const mapView = new google.maps.journeySharing.JourneySharingMapView(
      mapViewOptions
    );

    // Provide default zoom & center so the map loads even if trip ID is bad or stale.
    mapView.map.setOptions(DEFAULT_MAP_OPTIONS);
  }, []);

  return (
    <View>
      <TrackingIdComponent setTrackingId={setTrackingId} />
      <View style={styles.container}>
        <View style={styles.stack}>
          <OptionsComponent setMapOptions={setMapOptions} />
          <TaskInformation
            error={error}
            task={task}
            trackingId={trackingId.current}
          />
        </View>
        <View style={styles.mapContainer}>
          <View style={styles.map} ref={ref} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  map: {
    height: '75vh',
  },
  mapContainer: {
    width: '60%',
    marginRight: 20,
  },
  stack: {
    marginLeft: 15,
    width: '30%',
    flex: 1,
    flexDirection: 'column',
  },
});

export default MapComponent;
