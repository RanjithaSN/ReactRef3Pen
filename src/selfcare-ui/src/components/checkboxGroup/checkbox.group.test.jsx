import React from 'react';
import { mount } from '../../utilities/test.helper';
import Checkbox from '../checkbox/checkbox';
import CheckboxGroup from './checkbox.group';

describe('CheckboxGroup', () => {
  test('It should render a container with the c-checkboxGroup class.', () => {
    expect(mount(<CheckboxGroup name="cb-group" />).find('.c-checkbox-group').exists()).toBeTruthy();
  });

  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<CheckboxGroup name="cb-group" className="customClassName" />).find('.c-checkbox-group').hasClass('customClassName')).toBeTruthy();
  });

  test('It should add an aria-labeledby attribute to the checkbox group to support accessibility when a label is passed.', () => {
    expect(mount(<CheckboxGroup name="cb-group" label="my-label" />).find('.c-checkbox-group').prop('aria-labelledby')).toEqual('my-label');
  });

  test('It should add a name attribute to each child element which is the name property, appended with [].', () => {
    const wrapper = mount(
      <CheckboxGroup name="cb-group">
        <Checkbox id="1" />
        <Checkbox id="2" />
      </CheckboxGroup>
    );

    wrapper.find(Checkbox).forEach((checkbox) => {
      expect(checkbox.prop('name')).toEqual('cb-group[]');
    });
  });

  test('It should add the disabled property to each child element when the disabled property is passed to the checkbox group.', () => {
    const wrapper = mount(
      <CheckboxGroup name="cb-group" disabled>
        <Checkbox id="1" />
        <Checkbox id="2" />
      </CheckboxGroup>
    );

    wrapper.find(Checkbox).forEach((checkbox) => {
      expect(checkbox.prop('disabled')).toBeTruthy();
    });
  });

  test('It should add the readOnly property to each child element when the readOnly property is passed to the checkbox group.', () => {
    const wrapper = mount(
      <CheckboxGroup name="cb-group" readOnly>
        <Checkbox id="1" />
        <Checkbox id="2" />
      </CheckboxGroup>
    );

    wrapper.find(Checkbox).forEach((checkbox) => {
      expect(checkbox.prop('readOnly')).toBeTruthy();
    });
  });

  test('It should add an onChange function to each child element when the onChange property is passed to the checkbox group.', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckboxGroup name="cb-group" onChange={onChange}>
        <Checkbox id="1" />
        <Checkbox id="2" />
      </CheckboxGroup>
    );

    wrapper.find(Checkbox).forEach((checkbox) => {
      expect(checkbox.prop('onChange')).toEqual(onChange);
    });
  });
});
