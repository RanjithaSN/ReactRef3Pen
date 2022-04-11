import React from 'react';
import { mount } from '../../utilities/test.helper';
import CostWithLabel from './cost.with.label';

describe('CostWithLabel', () => {
  test('It should render a container with the c-cost-with-label class.', () => {
    expect(mount(<CostWithLabel cost="$30.00" label="MONTHLY" />).find('.c-cost-with-label').exists()).toBeTruthy();
  });

  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<CostWithLabel cost="$30.00" label="MONTHLY" className="customClassName" />).find('.c-cost-with-label').hasClass('customClassName')).toBeTruthy();
  });
});
