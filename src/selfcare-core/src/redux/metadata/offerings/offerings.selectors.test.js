import * as Offerings from './offerings.selectors';

const OFFER = {
  DisplayName: 'Test_OFFER',
  ContainsBulkPlans: true
};

const offerings = {
  offerExternalReferenceData: {
    id: '12345'
  }
};

describe('Offerings ', () => {
  describe('When the OfferingDisplayName is used...', () => {
    test('It should return null if no offer.', () => {
      expect(Offerings.OfferingDisplayName()).toBe(null);
    });
    test('It should return display name of given offer.', () => {
      expect(Offerings.OfferingDisplayName(OFFER)).toBe(OFFER.DisplayName);
    });
  });
  describe('When the OfferingIsBulk is used...', () => {
    test('It should return false if no offer.', () => {
      expect(Offerings.OfferingIsBulk()).toBe(false);
    });
    test('It should returns ContainsBulkPlans of given offer.', () => {
      expect(Offerings.OfferingIsBulk(OFFER)).toBe(OFFER.ContainsBulkPlans);
    });
  });
  describe('When OfferingExternalReferenceData is used', () => {
    test('It should return null if there are no ids', () => {
      expect(Offerings.OfferingExternalReferenceData()).toEqual({});
    });
    test('It should return the externalIds when it has data', () => {
      expect(Offerings.OfferingExternalReferenceData.resultFunc(offerings)).toEqual(offerings.offerExternalReferenceData);
    });
  });

  describe('When IsOfferingMetadataStatusLoading is used', () => {
    test('It should true when at least one of the items is loading', () => {
      const loading = {
        123: 'LOADING',
        232: 'UPDATED'
      };
      expect((Offerings.IsOfferingMetadataStatusLoading).resultFunc(loading)).toBe(true);
    });
    test('It should false if none of the items are loading', () => {
      const notLoading = {
        123: 'LOADED',
        232: 'UPDATED'
      };
      expect((Offerings.IsOfferingMetadataStatusLoading).resultFunc(notLoading)).toBe(false);
    });
  });
});
