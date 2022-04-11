import React from 'react';
import { mount } from '../../utilities/test.helper';
import Checkbox from './checkbox';

describe('Checkbox', () => {
  test('It should render a container with the c-checkbox class.', () => {
    expect(mount(<Checkbox id="test" />).find('.c-checkbox').exists()).toBeTruthy();
  });

  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<Checkbox id="test" className="customClassName" />).find('.c-checkbox').hasClass('customClassName')).toBeTruthy();
  });

  test('It should add the id property as the id attribute of the rendered input.', () => {
    expect(mount(<Checkbox id="test" />).find('.c-checkbox input').prop('id')).toEqual('test');
  });

  test('It should add the htmlFor attribute to both labels in the checkbox.', () => {
    const checkbox = mount(<Checkbox id="test" />);
    expect(checkbox.find('.c-checkbox').prop('htmlFor')).toEqual('test');
    expect(checkbox.find('.c-checkbox-label').prop('htmlFor')).toEqual('test');
  });
});
