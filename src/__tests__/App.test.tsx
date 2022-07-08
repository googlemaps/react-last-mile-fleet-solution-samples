import React from 'react';
import renderer from 'react-test-renderer';

import main from '../App';

it('renders correctly', () => {
  const tree = renderer.create(<main />).toJSON();
  expect(tree).toMatchSnapshot();
});
