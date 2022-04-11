import * as Ascendon from './ascendon.selectors';

describe('Ascendon', () => {
  const SUBSCRIBER_API = {
    id: 1
  };
  const CODES = {
    id: 2
  };

  const ASCENDON = {
    subscriberApi: SUBSCRIBER_API,
    metadata: CODES
  };

  const EXAMPLE_STATE = {
    ascendon: ASCENDON
  };

  describe('When the Ascendon is used...', () => {
    test('It should return the value of the ascendon attribute when one exists.', () => {
      expect(Ascendon.Ascendon(EXAMPLE_STATE)).toEqual(ASCENDON);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Ascendon.Ascendon()).toBeNull();
    });

    test('It should return null when there is no ascendon attribute in the store.', () => {
      expect(Ascendon.Ascendon({})).toBeNull();
    });
  });

  describe('When the SubscriberApi is used...', () => {
    test('It should return the value of the subscriberApi attribute when one exists.', () => {
      expect(Ascendon.SubscriberApi(EXAMPLE_STATE)).toEqual(SUBSCRIBER_API);
    });

    test('It should return null where there is no store passed in.', () => {
      expect(Ascendon.SubscriberApi()).toBeNull();
    });

    test('It should return null when there is no subscriberApi attribute.', () => {
      expect(Ascendon.SubscriberApi.resultFunc({})).toBeNull();
    });
  });

  describe('When the Codes is used...', () => {
    test('It should return the value of the codes attribute when one exists.', () => {
      expect(Ascendon.Metadata(EXAMPLE_STATE)).toEqual(CODES);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(Ascendon.Metadata()).toBeNull();
    });

    test('It should return null when there is no ascendon attribute in the store.', () => {
      expect(Ascendon.Metadata({})).toBeNull();
    });
  });
});
