import * as Config from '@selfcare/core/redux/configuration/configuration.selectors';
import * as CoreConvergentBillerActions from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions';
import * as Account from '../account/account.selectors';
import * as actions from './convergent.biller.actions';

jest.mock('@selfcare/core/redux/configuration/configuration.selectors');
jest.mock('@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.actions');
jest.mock('../account/account.selectors');

describe('Convergent Biller Actions', () => {
  const mockState = {
    prop: 'val'
  };

  const dispatch = jest.fn().mockResolvedValue();
  const getState = jest.fn(() => mockState);

  const subscriber = {
    subscriberId: '321'
  };
  const mySubscriber = '888';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('RetrieveConvergentBillerSummaryDbss action is called', () => {
    describe('from DBSS environment', () => {
      beforeEach(() => {
        Config.IsDbss.mockReturnValue(true);
        Account.CurrentAccountIsManaged.mockReturnValue(false);
        CoreConvergentBillerActions.RetrieveConvergentBillerSummary.mockReturnValue('RetrieveConvergentBillerSummary');

        actions.RetrieveConvergentBillerSummaryDbss()(dispatch, getState);
      });

      test('It should check for DBSS environment and if the current account is a managed account.', () => {
        expect(getState).toHaveBeenCalled();
        expect(Config.IsDbss).toHaveBeenCalledWith(mockState);
        expect(Account.CurrentAccountIsManaged).toHaveBeenCalledWith(mockState);
      });

      test('It should dispatch RetrieveConvergentBillerSummary with empty subscriber.', () => {
        expect(CoreConvergentBillerActions.RetrieveConvergentBillerSummary).toHaveBeenCalledWith(undefined, undefined);
        expect(dispatch).toHaveBeenNthCalledWith(1, 'RetrieveConvergentBillerSummary');
      });
    });
    describe('not from DBSS environment', () => {
      beforeEach(() => {
        Config.IsDbss.mockReturnValue(false);
        Account.CurrentAccountIsManaged.mockReturnValue(false);
        CoreConvergentBillerActions.RetrieveConvergentBillerSummary.mockReturnValue('RetrieveConvergentBillerSummary');

        actions.RetrieveConvergentBillerSummaryDbss()(dispatch, getState);
      });

      test('It should check for DBSS environment.', () => {
        expect(getState).toHaveBeenCalled();
        expect(Config.IsDbss).toHaveBeenCalledWith(mockState);
      });

      test('It should not dispatch RetrieveConvergentBillerSummary.', () => {
        expect(CoreConvergentBillerActions.RetrieveConvergentBillerSummary).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
      });
    });
    describe('from DBSS environment with managed account', () => {
      beforeEach(() => {
        Config.IsDbss.mockReturnValue(true);
        Account.CurrentAccountIsManaged.mockReturnValue(true);
        Account.CurrentManagedAccountObject.mockReturnValue(subscriber);
        CoreConvergentBillerActions.RetrieveConvergentBillerSummary.mockReturnValue('RetrieveConvergentBillerSummary');
        actions.RetrieveConvergentBillerSummaryDbss()(dispatch, getState);
      });

      test('It should check for DBSS environment and if the current account is a managed account.', () => {
        expect(getState).toHaveBeenCalled();
        expect(Config.IsDbss).toHaveBeenCalledWith(mockState);
        expect(Account.CurrentAccountIsManaged).toHaveBeenCalledWith(mockState);
        expect(Account.CurrentManagedAccountObject).toHaveBeenCalledWith(mockState);
      });

      test('It should dispatch RetrieveConvergentBillerSummary with subscriber info.', () => {
        expect(CoreConvergentBillerActions.RetrieveConvergentBillerSummary).toHaveBeenCalledWith(
          subscriber.subscriberId,
          actions.ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS
        );
        expect(dispatch).toHaveBeenNthCalledWith(1, 'RetrieveConvergentBillerSummary');
      });
    });
    describe('from DBSS environment with managed account and a subscriber sent in', () => {
      beforeEach(() => {
        Config.IsDbss.mockReturnValue(true);
        Account.CurrentAccountIsManaged.mockReturnValue(true);
        Account.CurrentManagedAccountObject.mockReturnValue(subscriber);
        CoreConvergentBillerActions.RetrieveConvergentBillerSummary.mockReturnValue('RetrieveConvergentBillerSummary');
        actions.RetrieveConvergentBillerSummaryDbss(mySubscriber)(dispatch, getState);
      });

      test('It should check for DBSS environment and not pull the current managed account.', () => {
        expect(getState).toHaveBeenCalled();
        expect(Config.IsDbss).toHaveBeenCalledWith(mockState);
        expect(Account.CurrentAccountIsManaged).not.toHaveBeenCalled();
        expect(Account.CurrentManagedAccountObject).not.toHaveBeenCalled();
      });

      test('It should dispatch RetrieveConvergentBillerSummary with subscriber info.', () => {
        expect(CoreConvergentBillerActions.RetrieveConvergentBillerSummary).toHaveBeenCalledWith(
          mySubscriber,
          actions.ConvergentBillerActionTypes.RETRIEVE_CONVERGENT_BILLER_SUMMARY_FOR_MANAGED_ACCOUNTS
        );
        expect(dispatch).toHaveBeenNthCalledWith(1, 'RetrieveConvergentBillerSummary');
      });
    });
  });
});
