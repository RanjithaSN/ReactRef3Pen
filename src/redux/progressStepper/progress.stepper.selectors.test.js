import { OrderFlowSteps } from './progress.stepper.selectors';

describe('ProgressStepper', () => {
  describe('OrderFlowSteps', () => {
    test('returns 4 steps when not logged in (either prospect or not prospect)', () => {
      expect(OrderFlowSteps.resultFunc(false, false)).toHaveLength(4);
      expect(OrderFlowSteps.resultFunc(false, true)).toHaveLength(4);
    });

    test('returns 3 steps when logged in', () => {
      expect(OrderFlowSteps.resultFunc(true, false)).toHaveLength(3);
    });

    test('returns 4 steps when logged in but they are a prospect', () => {
      expect(OrderFlowSteps.resultFunc(true, true)).toHaveLength(4);
    });

    test('returns recovery data for steps when logged in', () => {
      const result = OrderFlowSteps.resultFunc(true, false);
      expect(result.filter((step) => (step.recoverFromRefresh))).toHaveLength(3);
    });

    test('returns recovery data for steps when they are a prospect', () => {
      const result = OrderFlowSteps.resultFunc(true, true);
      expect(result.filter((step) => (step.recoverFromRefresh))).toHaveLength(4);
    });
  });
});
