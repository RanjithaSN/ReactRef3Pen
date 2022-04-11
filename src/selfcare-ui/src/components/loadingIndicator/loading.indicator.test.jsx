import React from 'react';
import IconLoadingIndicator from '../../icons/react-icons/loading-indicator';
import { mount } from '../../utilities/test.helper';
import LoadingIndicator from './loading.indicator';

xdescribe('LoadingIndicator', () => {
  test('It should render a container with the c-loading-indicator class.', () => {
    expect(mount(<LoadingIndicator />).find('.c-loading-indicator').exists()).toBeTruthy();
  });

  test('It should render an overlay with the c-loading-indicator class which contains the LoadingIndicator.', () => {
    expect(mount(<LoadingIndicator />).find('.c-loading-indicator').find(IconLoadingIndicator).exists()).toBeTruthy();
  });

  describe('When the isLoading property is true...', () => {
    test('It should add the is-loading class to the c-loadingIndicator element.', () => {
      expect(mount(<LoadingIndicator isLoading />).find('.c-loading-indicator').hasClass('is-loading')).toBeTruthy();
    });
  });
});
