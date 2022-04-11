import * as ThreeDS from './threeDS.selectors';

describe('ThreeDS Selectors ', () => {
  const clientStore = {
    processing3DSPaymentInstrument: true,
    threeDS1RedirectUrl: 'test/url'
  };

  xdescribe('When Processing3DSPaymentInstrument is used...', () => {
    test('It should return undefined if there is no value set', () => {
      expect(ThreeDS.Processing3DS.resultFunc({})).toEqual(undefined);
    });

    test('It should return an array of available flows if they exist', () => {
      expect(ThreeDS.Processing3DS.resultFunc(clientStore)).toEqual(true);
    });
  });

  describe('When ThreeDS1RedirectUrl is used ... ', () => {
    test('It should return the value of the threeDS1RedirectUrl attribute when one exists.', () => {
      expect(ThreeDS.ThreeDS1RedirectUrl.resultFunc(clientStore)).toEqual(clientStore.threeDS1RedirectUrl);
    });

    test('It should return null if there is no value set', () => {
      expect(ThreeDS.ThreeDS1RedirectUrl.resultFunc({})).toBeNull();
    });
  });

  describe('When ThreeDS1BaseRedirectUrl is used...', () => {
    describe('And the app is running on localhost...', () => {
      test('It should return the tst1 url when running on tst', () => {
        expect(ThreeDS.ThreeDS1BaseRedirectUrl.resultFunc('https://localhost')).toEqual('https://tst1-selfcare.tele2.ascendon.tv');
      });
    });

    describe('And the app is not running on localhost...', () => {
      test('It should return the base url of the app', () => {
        expect(ThreeDS.ThreeDS1BaseRedirectUrl.resultFunc('https://example.com')).toEqual('https://example.com');
      });
    });
  });

  describe('When ThreeDS1PaymentInstrumentRedirectUrl is used...', () => {
    test('It should return the right location', () => {
      expect(ThreeDS.ThreeDS1PaymentInstrumentRedirectUrl.resultFunc('https://example.com'))
        .toEqual('https://example.com/translated/translated');
    });
  });

  describe('When ThreeDS1SubmitOrderRedirectUrl is used...', () => {
    test('It should return the right location', () => {
      expect(ThreeDS.ThreeDS1SubmitOrderRedirectUrl.resultFunc('https://example.com'))
        .toEqual('https://example.com/translated/translated');
    });
  });
});
