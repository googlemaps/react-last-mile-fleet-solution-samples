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
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MapComponent from '../components/MapComponent';
import TrackingIdComponent from '../components/TrackingIdComponent';
import OptionsComponent from '../components/UI/OptionsComponent';

beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
});

describe('MapComponent', () => {
    it('matches previous snapshot', async () => {
        const wrapper = shallow(<MapComponent />);
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('renders the app correctly', () => {
        const wrapper = shallow(<MapComponent />);
        expect(wrapper.debug()).toBeTruthy();
    });

    it('calls setTrackingId on "Find" press', () => {
        const setTrackingId = jest.fn();
        const wrapper = shallow(<TrackingIdComponent setTrackingId={setTrackingId} />);
        wrapper.find('TextInput').simulate('changeText', 'Hello');
        wrapper.update();
        wrapper.find('Pressable').simulate('press');

        expect(setTrackingId).toHaveBeenCalled();
        expect(setTrackingId).toHaveBeenCalledWith('Hello');
    });

    it('renders apply button disabled', () => {
        const setMapOptions = jest.fn();
        const wrapper = shallow(<OptionsComponent setMapOptions={setMapOptions} />);
        const apply = wrapper.find('Pressable').at(2);

        expect(apply.props().disabled).toBeTruthy();
    });
});
