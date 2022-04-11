import React from 'react';
import { mount } from '../../utilities/test.helper';
import FormErrors from './form.errors';

describe('FormErrors', () => {
  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<FormErrors className="customClassName" />).find('.c-formErrors').at(0).hasClass('customClassName')).toBeTruthy();
  });

  describe('When an errors property is passed...', () => {
    test('It should render a <ul> with the c-formErrors-list class.', () => {
      expect(mount(<FormErrors errors={['error 1', 'error2']} />).find('.c-formErrors-list').exists()).toBeTruthy();
    });

    test('It should render an <li> for each error string in the errors property.', () => {
      expect(mount(<FormErrors errors={['error 1', 'error2']} />).find('.c-formErrors-list li').length).toEqual(2);
    });
  });
});
