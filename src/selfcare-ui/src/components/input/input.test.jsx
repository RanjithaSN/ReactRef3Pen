import React from 'react';
import { mount } from '../../utilities/test.helper';
import Input from './input';

describe('Input', () => {
  test('It should render a container with the c-input class.', () => {
    expect(mount(<Input id="my-id" type="text" />).find('input').hasClass('c-input')).toBeTruthy();
  });

  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<Input id="my-id" type="text" className="customClassName" />).find('.c-input').hasClass('customClassName')).toBeTruthy();
  });

  test('It should pass the id property down to the rendered input.', () => {
    expect(mount(<Input id="my-id" type="text" />).find('input').prop('id')).toEqual('my-id');
  });

  describe('When the type property is specified...', () => {
    test('It should render a container with the c-input--<type> class, wehre type is the same as the type property.', () => {
      expect(mount(<Input id="my-id" type="number" />).find('input').hasClass('c-input--number')).toBeTruthy();
    });

    test('It should pass the type property down to the rendered input.', () => {
      expect(mount(<Input id="my-id" type="number" />).find('input').prop('type')).toEqual('number');
    });
  });
});
