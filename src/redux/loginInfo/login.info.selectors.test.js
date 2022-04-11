import { INITIAL_STATE as INITIAL_SUBSCRIBER_STATE } from '@selfcare/core/redux/subscriber/subscriber.reducer';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE as INITIAL_LOGIN_INFO_STATE } from './login.info.reducer';
import * as LoginInfo from './login.info.selectors';

const EMPTY_OBJECT = {};

const initializedStore = new Immutable({})
  .setIn(['ascendon', 'subscriberApi', 'subscriber'], INITIAL_SUBSCRIBER_STATE)
  .setIn(['client', 'loginInfo'], INITIAL_LOGIN_INFO_STATE);

const BOB_PAYLOAD = {
  Login: 'Bob'
};

const BOB_RESULT = {
  NewLogin: 'Bob'
};


describe('LoginInfoSelectors', () => {
  describe('LoginInfoFormValues', () => {
    test('It should return an empty object when subscriber and formValues are missing', () => {
      expect(LoginInfo.LoginInfoFormValues(initializedStore)).toEqual(EMPTY_OBJECT);
    });

    test('It should return the formValues when they are present and subscriber is not', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'loginInfo', 'formValues'], BOB_RESULT);
      expect(LoginInfo.LoginInfoFormValues(CUSTOM_STATE)).toEqual(BOB_RESULT);
    });

    test('It should return map subscriber Login to NewLogin when it is present', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data', 'Subscriber'], BOB_PAYLOAD);
      expect(LoginInfo.LoginInfoFormValues(CUSTOM_STATE)).toEqual(BOB_RESULT);
    });
  });
});
