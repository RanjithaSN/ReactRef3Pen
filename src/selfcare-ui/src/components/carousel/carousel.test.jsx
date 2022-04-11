import React from 'react';
import { mount } from '../../utilities/test.helper';
import Carousel from './carousel';

describe('Carousel', () => {
  test('It should render a container with the c-carousel class.', () => {
    expect(mount(<Carousel />).find('.c-carousel').exists()).toBeTruthy();
  });

  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<Carousel className="customClassName" />).find('.c-carousel').hasClass('customClassName')).toBeTruthy();
  });

  test('It should add any children passed to the component within a c-carousel element.', () => {
    const notification = mount(<Carousel><div className="test">Test</div></Carousel>);
    expect(notification.find('.c-carousel .test').exists()).toBeTruthy();
  });

  test('It should render empty carousel when no children are added', () => {
    expect(mount(<Carousel />).find('.c-carousel').exists()).toBeTruthy();
  });
});
