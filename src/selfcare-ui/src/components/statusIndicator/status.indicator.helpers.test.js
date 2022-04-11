import { getStatusIndicatorToDisplay } from './status.indicator.helpers';
import { STATUS_TYPES } from './status.indicator.constants';

describe('When the getStatusIndicatorToDisplay function is used...', () => {
  test('It should return the status indicator based on the type and value passed in', () => {
    const TYPE = STATUS_TYPES.SUPPORT_REQUEST;
    const VALUE = 1;

    const statusIndicator = getStatusIndicatorToDisplay(TYPE, VALUE);
    expect(statusIndicator.id).toEqual(VALUE);
  });

  test('It should return null when a type cannot be found.', () => {
    const TYPE = 'unknownString';
    const VALUE = 1;
    const statusIndicator = getStatusIndicatorToDisplay(TYPE, VALUE);
    expect(statusIndicator).toBeNull();
  });
});
