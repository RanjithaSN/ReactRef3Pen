import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import { mount } from '../../utilities/test.helper';
import Container from './container';
import theme from 'ui/theme/theme';

describe('Container', () => {
  test('It should render the component.', () => {
    const component = shallow(
      <ThemeProvider theme={theme}>
        <Container className="customClassName" />
      </ThemeProvider>
    );
    expect(component).not.toBeNull();
  });
  test('It should append any custom class names to the component that are passed in.', () => {
    const component = mount(
      <ThemeProvider theme={theme}>
        <Container className="customClassName" />
      </ThemeProvider>
    );
    expect(component.find('div').hasClass('customClassName')).toBeTruthy();
  });
});
