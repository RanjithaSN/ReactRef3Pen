import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Notice from 'selfcare-ui/src/components/notice/notice';
import AuthenticationPanel from './authentication.panel';

describe('AuthenticationPanel', () => {
  describe('Basic Usage...', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Router><AuthenticationPanel heading="My Heading"><div className="test">Test</div></AuthenticationPanel></Router>);
    });

    test('It should render a container with the c-authenticationPanel class.', () => {
      expect(wrapper.find('.c-authenticationPanel').exists()).toBeTruthy();
    });

    test('It should render its content within a .c-authenticationPanel-card component.', () => {
      expect(wrapper.find('.c-authenticationPanel').find('.c-authenticationPanel-card').exists()).toBeTruthy();
    });

    test('It should render an element with the c-authenticationPanel-heading class containing the heading property.', () => {
      expect(wrapper.find('.c-authenticationPanel-card').find('.c-authenticationPanel-heading').at(0).text()).toEqual('My Heading');
    });

    test('It should render an element with the c-authenticationPanel-content class to contain the content of the panel.', () => {
      expect(wrapper.find('.c-authenticationPanel-card').find('.c-authenticationPanel-content').exists()).toBeTruthy();
    });

    test('It should render the children of the component within the content element.', () => {
      expect(wrapper.find('.c-authenticationPanel-content .test').exists()).toBeTruthy();
    });
  });

  describe('When the message property is provided...', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Router><AuthenticationPanel heading="My Heading" message="My Message"><div className="test">Test</div></AuthenticationPanel></Router>);
    });

    test('It should render an element with the c-authenticationPanel-bannerMessage class containing the message from the message property.', () => {
      expect(wrapper.find('.c-authenticationPanel-card').find('.c-authenticationPanel-bannerMessage').at(0).text()).toEqual('My Message');
    });
  });

  describe('When the notification property is provided...', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Router><AuthenticationPanel heading="My Heading" notification={<Notice heading="Notice" />}><div className="test">Test</div></AuthenticationPanel></Router>);
    });

    test('It should render an element with the c-authenticationPanel-bannerNotification class containing the notification from the notification proeprty.', () => {
      expect(wrapper.find('.c-authenticationPanel-card').find('.c-authenticationPanel-bannerNotification').find(Notice).exists()).toBeTruthy();
    });
  });

  test('It should append any custom class names to the component that are passed in.', () => {
    expect(mount(<Router><AuthenticationPanel className="customClassName" heading="heading"><div>test</div></AuthenticationPanel></Router>).find('.c-authenticationPanel').hasClass('customClassName')).toBeTruthy();
  });
});
