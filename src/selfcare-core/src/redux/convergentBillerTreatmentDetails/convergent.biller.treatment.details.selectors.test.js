import {
  ConvergentBillerTreatmentDetails,
  ConvergentBillerTreatmentDetailsIsLoading,
  ConvergentBillerTreatmentDetailsIsLoaded,
  PromiseToPay,
  EarliestOpenPromiseToPay
} from './convergent.biller.treatment.details.selectors';
import {
  INITIAL_STORE,
  POPULATED_STORE,
  POPULATED_STORE_DATA,
  SELECTED_PROMISES_TO_PAY
} from './convergent.biller.treatment.details.selectors.test.data';

describe('ConvergentBillerTreatmentDetails ', () => {
  describe('When the ConvergentBillerTreatmentDetails is used...', () => {
    test('It should return the value of the data attribute when one exists.', () => {
      expect(
        ConvergentBillerTreatmentDetails(POPULATED_STORE)
      ).toEqual(POPULATED_STORE_DATA.SubscriberTreatmentDetails);
    });

    test('It should return null when there is no store passed in.', () => {
      expect(ConvergentBillerTreatmentDetails()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(ConvergentBillerTreatmentDetails.resultFunc({})).toBeNull();
    });
  });

  describe('When the ConvergentBillerTreatmentDetailsIsLoading is used...', () => {
    test('It should return the value of the isLoading attribute when one exists.', () => {
      const CUSTOM_STATE = INITIAL_STORE
        .setIn(['ascendon', 'subscriberApi', 'convergentBiller', 'treatmentDetails', 'isLoading'], true);

      expect(ConvergentBillerTreatmentDetailsIsLoading(CUSTOM_STATE)).toBe(true);
    });

    test('It should return false when no store is passed in.', () => {
      expect(ConvergentBillerTreatmentDetailsIsLoading()).toBe(false);
    });

    test('It should return false when there is no isLoading attribute in the store.', () => {
      expect(ConvergentBillerTreatmentDetailsIsLoading.resultFunc({})).toBe(false);
    });
  });

  describe('When the ConvergentBillerTreatmentDetailsIsLoaded is used...', () => {
    test('It should return true if there is data and we are not loading.', () => {
      expect(ConvergentBillerTreatmentDetailsIsLoaded.resultFunc({}, false)).toBe(true);
    });

    test('It should return false when there is no data.', () => {
      expect(ConvergentBillerTreatmentDetailsIsLoaded.resultFunc(null, false)).toBe(false);
    });

    test('It should return false when we are loading.', () => {
      expect(ConvergentBillerTreatmentDetailsIsLoaded.resultFunc({}, true)).toBe(false);
    });
  });

  describe('When the PromiseToPay is used...', () => {
    test('It should return null when there is no store passed in.', () => {
      expect(PromiseToPay()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(PromiseToPay.resultFunc({})).toBeNull();
    });

    test('It should return a list of all promises to pay', () => {
      expect(PromiseToPay(POPULATED_STORE)).toEqual(SELECTED_PROMISES_TO_PAY);
    });
  });

  describe('When the EarliestOpenPromiseToPay is used...', () => {
    test('It should return null when there is no store passed in.', () => {
      expect(EarliestOpenPromiseToPay()).toBeNull();
    });

    test('It should return null when there is no data attribute in the store.', () => {
      expect(EarliestOpenPromiseToPay.resultFunc([])).toBeNull();
    });

    test('It should return the open promise-to-pay item closest to today.', () => {
      expect(EarliestOpenPromiseToPay(POPULATED_STORE)).toEqual(SELECTED_PROMISES_TO_PAY[2]);
    });
  });
});
