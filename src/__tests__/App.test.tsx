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
import App from '../../App';

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
});

describe('App', () => {
  it('matches previous snapshot', async () => {
    const wrapper = shallow(<App />);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.debug()).toBeTruthy();
  });
});
