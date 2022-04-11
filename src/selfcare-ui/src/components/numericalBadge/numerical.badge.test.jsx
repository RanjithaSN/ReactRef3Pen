import React from 'react';
import { mount } from '../../utilities/test.helper';
import NumericalBadge from './numerical.badge';

describe('NumericalBadge', () => {
  test('It should render a container with the c-numericalBadge class.', () => {
    expect(mount(<NumericalBadge badgeNumber={1} />).find('.c-numerical-badge').exists()).toBeTruthy();
  });

  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<NumericalBadge badgeNumber={1} className="customClassName" />).find('.c-numerical-badge').hasClass('customClassName')).toBeTruthy();
  });
});
