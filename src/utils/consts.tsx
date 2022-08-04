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

export const PROVIDER_URL = 'YOUR_PROVIDER_URL';
export const PROVIDER_PROJECT_ID = 'YOUR_PROJECT_ID';
export const API_KEY = 'YOUR_API_KEY';

export const DEFAULT_POLLING_INTERVAL_MS = 3000;
export const DEFAULT_MAP_OPTIONS = {
  center: { lat: 37.424069, lng: -122.0916944 },
  zoom: 14,
};

export const ICON_OPTIONS = {
  USE_DEFAULT: { displayName: 'Use default', icon: null },
  ORANGE_PIN: {
    displayName: 'Orange pin',
    icon: {
      path:
        'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.' +
        '13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.' +
        '12 2.5 2.5-1.12 2.5-2.5 2.5z',
      fillOpacity: 0.9,
      scale: 1.5,
      fillColor: '#fcb503',
      anchor: { x: 12, y: 23 },
    } as google.maps.Symbol,
  },
  GREEN_ARROW: {
    displayName: 'Green arrow',
    icon: {
      path: 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z',
      fillOpacity: 0.9,
      scale: 1.2,
      fillColor: '#03fc2c',
      anchor: { x: 12, y: 12 },
    } as google.maps.Symbol,
  },
};
