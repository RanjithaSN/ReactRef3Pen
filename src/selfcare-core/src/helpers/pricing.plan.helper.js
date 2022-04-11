import pathOr from 'ramda/src/pathOr';

export const getFinanceRulesForPricingPlan = (pricingPlan) => {
  return pathOr([], ['PricingPlanBillerRuleInstances', 'FinanceBillerRuleInstances'], pricingPlan);
};

export const getFullDownPaymentAmountForPricingPlan = (pricingPlan) => {
  const charges = pathOr(
    [],
    ['PricingPlanBillerRuleInstances', 'FinanceBillerRuleInstances', '0', 'BillerRuleInstanceCharges'],
    pricingPlan
  );

  return charges.reduce((total, { ChargeAmount }) => total + ChargeAmount, 0);
};

export const getDownPaymentCommitmentForPricingPlan = (pricingPlan) => {
  return pathOr(
    0,
    ['PricingPlanBillerRuleInstances', 'FinanceBillerRuleInstances', '0', 'MinimumDownPaymentAmount'],
    pricingPlan
  );
};
