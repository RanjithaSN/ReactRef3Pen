import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './submit.order.reducer';
import { IsSubmitOrderLoaded, IsSubmittingOrder, SubmitOrderData } from './submit.order.selectors';

const APP_STORE = Immutable({});

describe('Submit Order ', () => {
  describe('IsSubmittingOrder with initial state', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {
                submitOrder: INITIAL_STATE
              }
            }
          }
        }, {
          deep: true
        });

      response = IsSubmittingOrder(appStore);
    });

    it('should return false', () => {
      expect(response).toEqual(false);
    });
  });

  describe('SubmitOrderData with a submitted order', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {
                submitOrder: {
                  data: {
                    OrderNumber: '102306038',
                    TotalAmount: 123.45
                  }
                }
              }
            }
          }
        }, {
          deep: true
        });

      response = SubmitOrderData(appStore);
    });

    it('should return 02306038 for OrderNumber', () => {
      expect(response.OrderNumber).toEqual('102306038');
    });
    it('should return 123.45 for TotalAmount', () => {
      expect(response.TotalAmount).toEqual(123.45);
    });
  });

  describe('SubmitOrderData with a submitted order', () => {
    let response;

    beforeEach(() => {
      const appStore = APP_STORE
        .merge({
          ascendon: {
            subscriberApi: {
              ordering: {
                submitOrder: {
                  data: {
                    OrderNumber: '102306038',
                    TotalAmount: 123.45,
                    Currency: 'CHF'
                  }
                }
              }
            }
          }
        }, {
          deep: true
        });

      response = SubmitOrderData(appStore);
    });

    it('should return 102306038 for OrderNumber', () => {
      expect(response.OrderNumber).toEqual('102306038');
    });
    it('should return 123.45 for TotalAmount', () => {
      expect(response.TotalAmount).toEqual(123.45);
    });
  });

  describe('IsSubmitOrderLoaded should return a bool', () => {
    it('should return true when the value in state is true', () => {
      expect(IsSubmitOrderLoaded.resultFunc({
        isSubmitOrderLoaded: true
      })).toBe(true);
    });
    it('should return false when the value in state is false', () => {
      expect(IsSubmitOrderLoaded.resultFunc({
        isSubmitOrderLoaded: false
      })).toBe(false);
    });
    it('should return false when there is no state', () => {
      expect(IsSubmitOrderLoaded.resultFunc({
        somethingIDontCareAbout: true
      })).toBe(false);
    });
  });
});
