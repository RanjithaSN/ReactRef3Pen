import { AboutPagesTypes } from './about.pages.actions';
import reducer, { INITIAL_STATE } from './about.pages.reducer';

describe('AboutPages Reducer', () => {
  describe('When beginning retrieve aboutPages call...', () => {
    let response;

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: AboutPagesTypes.RetrieveAboutPages.BEGIN
      });
    });

    test('It sets isLoading to true.', () => {
      expect(response.isLoading).toBe(true);
    });
  });

  describe('When retrieve aboutPages call succeeds...', () => {
    let response;
    const payload = {};

    beforeEach(() => {
      response = reducer(INITIAL_STATE, {
        type: AboutPagesTypes.RetrieveAboutPages.SUCCESS,
        payload
      });
    });

    test('It sets isLoading to false.', () => {
      expect(response.isLoading).toBe(false);
    });

    test('It sets data to the payload.', () => {
      expect(response.data).toEqual(payload);
    });
  });
});
