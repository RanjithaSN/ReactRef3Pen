import { shallow } from 'enzyme';
import React from 'react';
import { Pill } from './pill';

describe('Pill', () => {
  test('It should render a Pill as dark when mode is primary', () => {
    const component = shallow(<Pill id="test2" text="text" mode="primary" />);
    const props = component.props();
    expect(props.className).toEqual('c-pill c-pill__primary');
  });
  test('It should render a Pill as light when mode is inverted', () => {
    const component = shallow(<Pill id="test2" text="text" mode="inverted" />);
    const props = component.props();
    expect(props.className).toEqual('c-pill c-pill__inverted');
  });
});
