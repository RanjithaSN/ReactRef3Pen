import { DefaultPaymentInstrument } from './make.payment.selectors';
import { POPULATED_STORE_WITH_DEFAULT_PI, POPULATED_STORE_WITHOUT_DEFAULT_PI } from './make.payment.selectors.test.data';

describe('Make A Payment ', () => {
  describe('When the DefaultPaymentInstrument is used...', () => {
    test('It should return a null value when no applicable default is selectable', () => {
      expect(
        DefaultPaymentInstrument(POPULATED_STORE_WITHOUT_DEFAULT_PI)
      ).toBeNull();
    });

    test('It should return a default instrument when one is available', () => {
      expect(
        DefaultPaymentInstrument(POPULATED_STORE_WITH_DEFAULT_PI)
      ).toMatchObject({
        Id: 2
      });
    });
  });
});
