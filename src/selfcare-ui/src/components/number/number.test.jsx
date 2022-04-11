import React from 'react';
import { mount } from '../../utilities/test.helper';
import Number from './number';

xdescribe('Number', () => {
  test('It should render an English (US) based number with commas separating every three tens places.', () => {
    // Enzyme does not support components that do not render a containing HTML element.  So we have to wrap
    // the component in a div to reference the rendered contents.
    const wrapper = mount(<div><Number value={1000000} /></div>);
    expect(wrapper.at(0).text()).toEqual('1 000 000');
  });
});
