import Immutable from 'seamless-immutable';
import { Ordering } from './ordering.selectors';

const APP_STORE = Immutable({});

describe('Available Ordering ', () => {
  describe('Ordering with initial state', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {}
            }
          }
        }, {
          deep: true
        });

      response = Ordering(appStore);
    });

    it('should return the inital state', () => {
      expect(response).toEqual({});
    });
  });
});
