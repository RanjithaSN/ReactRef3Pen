import React from 'react';
import { mount } from '../../utilities/test.helper';
import Button from './button';

describe('Button', () => {
  test('It should render a button with the c-filled-button class. Default width and auto', () => {
    const button = mount(<Button />).find('button');
    expect(button.hasClass('c-button')).toBeTruthy();
    expect(button.hasClass('c-button--auto')).toBeTruthy();
  });

  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<Button className="customClassName" />).find('button').hasClass('customClassName')).toBeTruthy();
  });

  test('It should pass the width property down to the rendered button.', () => {
    const button = mount(<Button width="flex" />).find('button');
    expect(button.hasClass('c-button--flex')).toBeTruthy();
  });
});
