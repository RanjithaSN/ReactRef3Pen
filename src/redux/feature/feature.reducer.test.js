import Immutable from 'seamless-immutable';
import { FeatureActionTypes } from './feature.actions';
import reducer from './feature.reducer';

export const INITIAL_STATE = new Immutable({
  FANCY_FEATURE: true
});


describe('Site Reducer', () => {
  describe('When FeatureActionTypes.EnableFeature is dispatched...', () => {
    const feature = 'FANCY_FEATURE';

    test('It should set feature to true.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FeatureActionTypes.EnableFeature,
        feature
      });
      expect(response.FANCY_FEATURE).toEqual(true);
    });
  });

  describe('When FeatureActionTypes.DisableFeature is dispatched...', () => {
    const feature = 'FANCY_FEATURE';

    test('It should set feature to false.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FeatureActionTypes.DisableFeature,
        feature
      });
      expect(response.FANCY_FEATURE).toEqual(false);
    });
  });

  describe('When FeatureActionTypes.EnableFeature is dispatched...', () => {
    const feature = 'NON_EXITING_FEATURE';

    test('It should set feature to true.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FeatureActionTypes.EnableFeature,
        feature
      });
      expect(typeof response.NON_EXITING_FEATURE).toBe('undefined');
    });
  });

  describe('When FeatureActionTypes.DisableFeature is dispatched...', () => {
    const feature = 'NON_EXITING_FEATURE';

    test('It should set feature to false.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FeatureActionTypes.DisableFeature,
        feature
      });
      expect(typeof response.NON_EXITING_FEATURE).toBe('undefined');
    });
  });


  describe('When FeatureActionTypes.EnableVariant is dispatched...', () => {
    const feature = 'FANCY_FEATURE';
    const variant = 'B';

    test('It should set feature to false.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FeatureActionTypes.EnableVariant,
        feature,
        variant
      });
      expect(response.FANCY_FEATURE).toEqual('B');
    });
  });


  describe('When FeatureActionTypes.EnableVariant is dispatched...', () => {
    const feature = 'NON_EXITING_FEATURE';
    const variant = 'B';

    test('It should set feature to false.', () => {
      const response = reducer(INITIAL_STATE, {
        type: FeatureActionTypes.EnableVariant,
        feature,
        variant
      });
      expect(typeof response.NON_EXITING_FEATURE).toBe('undefined');
    });
  });
});
