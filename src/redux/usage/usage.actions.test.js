import * as Config from '@selfcare/core/redux/configuration/configuration.selectors';
import * as CoreUsageActions from '@selfcare/core/redux/convergentBillerAccountUsageDetails/convergent.biller.account.usage.details.actions';
import * as Account from '../account/account.selectors';
import * as actions from './usage.actions';


jest.mock('@selfcare/core/redux/configuration/configuration.selectors');
jest.mock('@selfcare/core/redux/convergentBillerAccountUsageDetails/convergent.biller.account.usage.details.actions');
jest.mock('../account/account.selectors');

describe('Usage Actions', () => {
  const mockState = {
    prop: 'val'
  };

  const dispatch = jest.fn().mockResolvedValue();
  const getState = jest.fn(() => mockState);

  const subscriber = {
    subscriberId: '321'
  };
  const serviceId = '432';
  const startDate = new Date();
  const endDate = new Date();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('RetrieveConvergentBillerAccountUsageDetailsDbss action is called', () => {
    describe('from DBSS environment', () => {
      beforeEach(() => {
        Config.IsDbss.mockReturnValue(true);
        Account.CurrentAccountIsManaged.mockReturnValue(false);
        CoreUsageActions.RetrieveConvergentBillerAccountUsageDetails.mockReturnValue('RetrieveConvergentBillerAccountUsageDetails');

        actions.RetrieveConvergentBillerAccountUsageDetailsDbss(serviceId, startDate, endDate)(dispatch, getState);
      });

      test('It should check for DBSS environment and if the current account is a managed account.', () => {
        expect(getState).toHaveBeenCalled();
        expect(Config.IsDbss).toHaveBeenCalledWith(mockState);
        expect(Account.CurrentAccountIsManaged).toHaveBeenCalledWith(mockState);
      });

      test('It should dispatch RetrieveConvergentBillerAccountUsageDetails with empty subscriber.', () => {
        expect(CoreUsageActions.RetrieveConvergentBillerAccountUsageDetails).toHaveBeenCalledWith(undefined, serviceId, startDate, endDate);
        expect(dispatch).toHaveBeenNthCalledWith(1, 'RetrieveConvergentBillerAccountUsageDetails');
      });
    });
    describe('not from DBSS environment', () => {
      beforeEach(() => {
        Config.IsDbss.mockReturnValue(false);
        Account.CurrentAccountIsManaged.mockReturnValue(false);
        CoreUsageActions.RetrieveConvergentBillerAccountUsageDetails.mockReturnValue('RetrieveConvergentBillerAccountUsageDetails');

        actions.RetrieveConvergentBillerAccountUsageDetailsDbss(serviceId, startDate, endDate)(dispatch, getState);
      });

      test('It should check for DBSS environment.', () => {
        expect(getState).toHaveBeenCalled();
        expect(Config.IsDbss).toHaveBeenCalledWith(mockState);
      });

      test('It should not dispatch RetrieveConvergentBillerAccountUsageDetails.', () => {
        expect(CoreUsageActions.RetrieveConvergentBillerAccountUsageDetails).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
      });
    });
    describe('from DBSS environment with managed account', () => {
      beforeEach(() => {
        Config.IsDbss.mockReturnValue(true);
        Account.CurrentAccountIsManaged.mockReturnValue(true);
        Account.CurrentManagedAccountObject.mockReturnValue(subscriber);
        CoreUsageActions.RetrieveConvergentBillerAccountUsageDetails.mockReturnValue('RetrieveConvergentBillerAccountUsageDetails');
        actions.RetrieveConvergentBillerAccountUsageDetailsDbss(serviceId, startDate, endDate)(dispatch, getState);
      });

      test('It should check for DBSS environment and if the current account is a managed account.', () => {
        expect(getState).toHaveBeenCalled();
        expect(Config.IsDbss).toHaveBeenCalledWith(mockState);
        expect(Account.CurrentAccountIsManaged).toHaveBeenCalledWith(mockState);
        expect(Account.CurrentManagedAccountObject).toHaveBeenCalledWith(mockState);
      });

      test('It should dispatch RetrieveConvergentBillerAccountUsageDetails with subscriber info.', () => {
        expect(CoreUsageActions.RetrieveConvergentBillerAccountUsageDetails).toHaveBeenCalledWith(subscriber.subscriberId, serviceId, startDate, endDate);
        expect(dispatch).toHaveBeenNthCalledWith(1, 'RetrieveConvergentBillerAccountUsageDetails');
      });
    });
  });
});
