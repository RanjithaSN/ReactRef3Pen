import React from 'react';
import { mount } from '../../utilities/test.helper';
import FacebookMessenger from './facebook.messenger';

describe('FacebookMessenger', () => {
  test('It should render a container with the c-facebook-messenger class.', () => {
    expect(mount(<FacebookMessenger />).find('.c-facebook-messenger').exists()).toBeTruthy();
  });
});
