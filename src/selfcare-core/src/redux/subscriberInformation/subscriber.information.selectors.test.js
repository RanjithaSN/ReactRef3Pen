import { LegalName, PostalCode, SsnLookup, SsnLookupIsLoaded, SsnLookupIsLoading, UpdateSubscriberIsLoading } from './subscriber.information.selectors';

describe('Subscriber Information', () => {
  describe('SsnLookup', () => {
    test('returns the ssnLookup sub-object in the data state', () => {
      expect(SsnLookup.resultFunc({
        ssnLookup: {
          ssn: '19901212-1234'
        }
      })).toEqual({
        ssn: '19901212-1234'
      });
    });

    test('returns an empty object when ssnLookup is not present', () => {
      expect(SsnLookup.resultFunc({})).toEqual({});
    });
  });

  describe('SsnLookupIsLoaded', () => {
    test('returns true when there is data and is set to not loading', () => {
      expect(SsnLookupIsLoaded.resultFunc([1, 2], false, false)).toEqual(true);
    });

    test('returns false when there is data and is set to loading', () => {
      expect(SsnLookupIsLoaded.resultFunc([1, 2], true, false)).toEqual(false);
    });

    test('returns false when there is data and it is not loading but there is an error detected', () => {
      expect(SsnLookupIsLoaded.resultFunc([1, 2], false, true)).toEqual(false);
    });

    test('returns false when there is no data and is set to not loading', () => {
      expect(SsnLookupIsLoaded.resultFunc([], false, false)).toEqual(false);
    });

    test('returns false when there is no data and is set to loading', () => {
      expect(SsnLookupIsLoaded.resultFunc([], true, false)).toEqual(false);
    });
  });

  describe('SsnLookupIsLoading', () => {
    test('returns true when the isLoading is true', () => {
      expect(SsnLookupIsLoading.resultFunc({
        isLoading: true
      })).toEqual(true);
    });

    test('returns false when the isLoading is false', () => {
      expect(SsnLookupIsLoading.resultFunc({
        isLoading: false
      })).toEqual(false);
    });
  });

  describe('UpdateSubscriberIsLoading', () => {
    test('returns true when the updateSubscriberLoading is true', () => {
      expect(UpdateSubscriberIsLoading.resultFunc({
        updateSubscriberLoading: true
      })).toEqual(true);
    });

    test('returns false when the updateSubscriberLoading is false', () => {
      expect(UpdateSubscriberIsLoading.resultFunc({
        updateSubscriberLoading: false
      })).toEqual(false);
    });
  });
  describe('LegalName', () => {
    test('returns an empty string when there is no data', () => {
      expect(LegalName.resultFunc({})).toEqual('');
    });
    test('returns an empty string when there is no data', () => {
      expect(LegalName.resultFunc({
        fNamn: 'hi',
        eNamn: 'last'
      }, true)).toEqual('');
    });
    test('returns an first last names when there is data', () => {
      const data = {
        fNamn: 'hi',
        eNamn: 'last'
      };
      expect(LegalName.resultFunc(data, false)).toEqual(`${data.fNamn} ${data.eNamn}`);
    });
  });
  describe('PostalCode', () => {
    test('returns an empty string when there is no data', () => {
      expect(PostalCode.resultFunc({})).toEqual('');
    });
    test('returns an empty string when there is no data', () => {
      expect(PostalCode.resultFunc({
        fbfPostnr: 99988,
        eNamn: 'last'
      }, true)).toEqual('');
    });
    test('returns an first last names when there is data', () => {
      const data = {
        fbfPostnr: 99988,
        eNamn: 'last'
      };
      expect(PostalCode.resultFunc(data, false)).toEqual('999 88');
    });
  });
});
