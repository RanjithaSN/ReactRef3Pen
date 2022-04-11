import * as PricingPlanHelpers from './pricing.plan.helper';

describe('PricingPlanHelpers', () => {
  let pricingPlan;

  beforeEach(() => {
    pricingPlan = {
      PricingPlanBillerRuleInstances: {
        FinanceBillerRuleInstances: [
          {
            Id: 1
          }
        ]
      }
    };
  });

  describe('getFinanceRulesForPricingPlan', () => {
    describe('And there are finance rules for pricing plan', () => {
      it('Should return list of financing rules', () => {
        expect(PricingPlanHelpers.getFinanceRulesForPricingPlan(pricingPlan)).toEqual([
          {
            Id: 1
          }
        ]);
      });
    });

    describe('An dthere are no finance rules for pricing plan', () => {
      beforeEach(() => {
        pricingPlan.PricingPlanBillerRuleInstances = {};
      });

      it('Should return empty list of financing rules', () => {
        expect(PricingPlanHelpers.getFinanceRulesForPricingPlan(pricingPlan)).toEqual([]);
      });
    });
  });

  describe('getFullDownPaymentAmountForPricingPlan', () => {
    describe('And there are charges', () => {
      beforeEach(() => {
        pricingPlan.PricingPlanBillerRuleInstances.FinanceBillerRuleInstances = [
          {
            BillerRuleInstanceCharges: [
              {
                ChargeAmount: 100
              },
              {
                ChargeAmount: 400
              }
            ]
          }
        ];
      });

      it('Should return sum of charges', () => {
        expect(PricingPlanHelpers.getFullDownPaymentAmountForPricingPlan(pricingPlan)).toBe(500);
      });
    });

    describe('And there are no charges', () => {
      it('Should return 0', () => {
        expect(PricingPlanHelpers.getFullDownPaymentAmountForPricingPlan({})).toBe(0);
      });
    });
  });

  describe('getDownPaymentCommitmentForPricingPlan', () => {
    describe('And there is financing rules for pricing plan', () => {
      beforeEach(() => {
        pricingPlan.PricingPlanBillerRuleInstances.FinanceBillerRuleInstances = [
          {
            MinimumDownPaymentAmount: 150
          }
        ];
      });

      it('Should return minimum down payment amount', () => {
        expect(PricingPlanHelpers.getDownPaymentCommitmentForPricingPlan(pricingPlan)).toBe(150);
      });
    });

    describe('And there is no financing rules for pricing plan', () => {
      it('Should return 0', () => {
        expect(PricingPlanHelpers.getFullDownPaymentAmountForPricingPlan({})).toBe(0);
      });
    });
  });
});
