import Immutable from 'seamless-immutable';
import { INITIAL_STATE } from './benefits.reducer';
import { BenefitsConfiguration } from './benefits.selectors';

const initializedStore = new Immutable({
  ascendon: {
    benefitsConfiguration: INITIAL_STATE
  }
});

describe('Benefits Configuration Selectors', () => {
  test('it should return the benefits configuration block', () => {
    const CUSTOM_STATE = initializedStore;
    const actual = BenefitsConfiguration(CUSTOM_STATE);
    expect(actual).toBeNull();
  });
});
