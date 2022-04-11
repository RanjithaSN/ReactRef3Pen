import React from 'react';
import { mount } from '../../utilities/test.helper';
import FilledButton from './filled.button';

describe('Filled Button', () => {
  test('It should render a button with the c-filled-button class. Default variant and height of standard and auto', () => {
    const button = mount(<FilledButton />).find('button');
    expect(button.hasClass('c-filled-button')).toBeTruthy();
    expect(button.hasClass('c-filled-button--standard')).toBeTruthy();
    expect(button.hasClass('c-filled-button--auto')).toBeTruthy();
  });

  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<FilledButton className="customClassName" />).find('button').hasClass('customClassName')).toBeTruthy();
  });

  test('It should pass the variant and height properties down to the rendered button.', () => {
    const button = mount(<FilledButton variant="info" height="short" />).find('button');
    expect(button.hasClass('c-filled-button--info')).toBeTruthy();
    expect(button.hasClass('c-filled-button--short')).toBeTruthy();
  });
});
