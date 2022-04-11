import React from 'react';
import { mount } from '../../utilities/test.helper';
import Heading from './heading';

xdescribe('Heading', () => {
  test('It should render a Heading with h1 for loud brand.', () => {
    expect(mount(<Heading category="brand" tone="loud">Ha Penny</Heading>).find('h1').at(0).text()).toEqual('Ha Penny');
  });
  test('It should render a Heading with h2 for normal brand.', () => {
    expect(mount(<Heading category="brand" tone="normal">Ha Penny</Heading>).find('h2').at(0).text()).toEqual('Ha Penny');
  });
  test('It should render a Heading with h3 for quiet brand.', () => {
    expect(mount(<Heading category="brand" tone="quiet">Ha Penny</Heading>).find('h3').at(0).text()).toEqual('Ha Penny');
  });
  test('It should render a Heading with h4 for normal major (and loud/invalid defaults to normal).', () => {
    expect(mount(<Heading category="major" tone="normal">Ha Penny</Heading>).find('h4').at(0).text()).toEqual('Ha Penny');
    expect(mount(<Heading category="major" tone="loud">Ha Penny</Heading>).find('h4').at(0).text()).toEqual('Ha Penny');
    expect(mount(<Heading category="major" tone="what">Ha Penny</Heading>).find('h4').at(0).text()).toEqual('Ha Penny');
  });
  test('It should render a Heading with h5 for quiet major.', () => {
    expect(mount(<Heading category="major" tone="quiet">Ha Penny</Heading>).find('h5').at(0).text()).toEqual('Ha Penny');
  });
  test('It should render a Heading with h6 for normal minor (and loud/invalid defaults to normal).', () => {
    expect(mount(<Heading category="minor" tone="normal">Ha Penny</Heading>).find('h6').at(0).text()).toEqual('Ha Penny');
    expect(mount(<Heading category="minor" tone="loud">Ha Penny</Heading>).find('h6').at(0).text()).toEqual('Ha Penny');
    expect(mount(<Heading category="minor" tone="huh">Ha Penny</Heading>).find('h6').at(0).text()).toEqual('Ha Penny');
  });
  test('It should render a Heading with a span for quiet minor.', () => {
    expect(mount(<Heading category="minor" tone="quiet">Ha Penny</Heading>).find('span').at(0).text()).toEqual('Ha Penny');
  });
  test('It should render a Heading with an h4 for any other variants (invalid ones).', () => {
    expect(mount(<Heading category="wierd" tone="normal">Ha Penny</Heading>).find('h4').at(0).text()).toEqual('Ha Penny');
  });
});
