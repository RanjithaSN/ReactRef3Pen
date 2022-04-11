import { INITIAL_STATE as INITIAL_SUBSCRIBER_STATE } from '@selfcare/core/redux/subscriber/subscriber.reducer';
import Immutable from 'seamless-immutable';
import { INITIAL_STATE as INITIAL_USER_INFO_STATE } from './user.info.reducer';
import * as SampleObjects from './user.info.sample.objects';
import * as UserInfo from './user.info.selectors';

const EMPTY_OBJECT = {};

const initializedStore = new Immutable({})
  .setIn(['ascendon', 'subscriberApi', 'subscriber'], INITIAL_SUBSCRIBER_STATE)
  .setIn(['client', 'userInfo'], INITIAL_USER_INFO_STATE);

const BOB_DOLE = {
  firstName: 'Bob',
  lastName: 'Dole'
};

describe('UserInfoSelectors', () => {
  describe('UserInfoFormValues', () => {
    test('It should return an empty object when subscriber and formValues are missing', () => {
      expect(UserInfo.UserInfoFormValues(initializedStore)).toEqual(EMPTY_OBJECT);
    });

    test('It should return the subscriber when it is present and formValues is not', () => {
      const CUSTOM_STATE = initializedStore.setIn(['ascendon', 'subscriberApi', 'subscriber', 'data', 'Subscriber'], BOB_DOLE);
      expect(UserInfo.UserInfoFormValues(CUSTOM_STATE)).toEqual(BOB_DOLE);
    });

    test('It should return the formValues when it is present', () => {
      const CUSTOM_STATE = initializedStore.setIn(['client', 'userInfo', 'formValues'], BOB_DOLE);
      expect(UserInfo.UserInfoFormValues(CUSTOM_STATE)).toEqual(BOB_DOLE);
    });
  });

  describe('UserInfoFormFields', () => {
    test('It should return an empty object when subscriberRequirementsLoaded is false', () => {
      expect(UserInfo.UserInfoFormFields.resultFunc(false, null, null, null)).toEqual({});
    });

    test('it should filter out the fields and just return the mobile number when subscirber is loaded and we pass in a ton of valid data', () => {
      const result = UserInfo.UserInfoFormFields.resultFunc(
        true,
        SampleObjects.SubscriberRequirementsSampleObject,
        SampleObjects.FieldsSampleObject,
        SampleObjects.UserInfoFormValuesSampleObject
      );
      expect(Object.keys(result).length).toEqual(1);
      expect(result.mobile_phone).toBeDefined();
    });
  });

  describe('UserInfoFormFieldsFormatted', () => {
    test('It should return an empty array when no object passed in', () => {
      expect(UserInfo.UserInfoFormFieldsFormatted.resultFunc(null)).toEqual([]);
    });
    test('It should return an array with 1 item when an object is passed in (just mobile section)', () => {
      expect(UserInfo.UserInfoFormFieldsFormatted.resultFunc({
        notMobile: 'test',
        anotherNotMobile: 'test1',
        mobile_phone: {
          title: 'wow this is neat'
        }
      })).toEqual([[
        {
          title: 'wow this is neat'
        }
      ]]);
    });
  });
});
