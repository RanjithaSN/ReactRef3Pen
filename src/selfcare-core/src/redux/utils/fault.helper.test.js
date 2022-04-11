import i18next from 'i18next';
import * as FaultHelper from './fault.helper';
import ApiFaultCodes from '../../constants/api.fault.codes';


describe('Fault Helper', () => {
  beforeEach(() => {
    i18next.t = jest.fn(() => 'translated string');
  });
  describe('When getFaultCode is called...', () => {
    test('It should return the fault code as a string.', () => {
      const fault = {
        Code: 1
      };
      expect(FaultHelper.getFaultCode(fault)).toEqual('1');
    });

    test('It should return the fault code and sub code as a string when both exist.', () => {
      const fault = {
        Code: 1,
        Subcode: 123
      };
      expect(FaultHelper.getFaultCode(fault)).toEqual('1-123');
    });
  });

  describe('When translateFaultCode is called...', () => {
    test('It should return a translated message for a code which exists.', () => {
      expect(FaultHelper.translateFaultCode(0)).toEqual('translated string');
    });

    test('It should return a translated message for the main code when the sub code has no translation.', () => {
      i18next.t.mockReturnValueOnce('fault.0').mockReturnValueOnce('another message');
      expect(FaultHelper.translateFaultCode(0, 1)).toEqual('another message');
    });

    test('It should return a fallback message that includes the fault code when the main code and sub code have no translation.', () => {
      i18next.t.mockReturnValueOnce('fault.0').mockReturnValueOnce('fault.0').mockReturnValueOnce('final message');
      expect(FaultHelper.translateFaultCode(0, 1)).toEqual('final message - 0');
    });
  });

  describe('When translateFault is called...', () => {
    const fault = {
      Code: 0
    };
    let translatedFault;

    beforeEach(() => {
      translatedFault = FaultHelper.translateFault(fault);
    });

    test('It should append a translatedMessage attribute on the fault.', () => {
      expect(translatedFault.translatedMessage).toEqual('translated string');
    });

    test('It should add the faultCode to the fault.', () => {
      expect(translatedFault.faultCode).toBe(`${fault.Code}`);
    });
  });

  describe('When generateUnhandledFault is called...', () => {
    const response = {
      status: 'error status'
    };
    let fault;

    beforeEach(() => {
      fault = FaultHelper.generateUnhandledFault(response);
    });

    test('It should return an object with the unknown fault code.', () => {
      expect(fault.Code).toBe(parseInt(ApiFaultCodes.UNKNOWN, 10));
    });

    test('It should return an object with the status from the error.', () => {
      expect(fault.Status).toBe(response.status);
    });
  });

  describe('When generateUnhandledFault is called with a null response', () => {
    const response = null;
    let fault;

    beforeEach(() => {
      fault = FaultHelper.generateUnhandledFault(response);
    });

    test('It should return an object with the unknown fault code.', () => {
      expect(fault.Code).toBe(parseInt(ApiFaultCodes.UNKNOWN, 10));
    });

    test('It should return an object with the status from the error.', () => {
      expect(fault.Status).toBe(null);
    });
  });
});
