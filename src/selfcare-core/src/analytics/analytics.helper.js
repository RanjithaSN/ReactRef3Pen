
export const createProduct = (element, index, dimension2, campaignId = 'undefined', variant = 'undefined') => {
  return {
    id: element.pricingPlanId,
    name: element.sizeDisplayData.name,
    price: element.cost.toFixed(2),
    brand: 'Penny',
    category: element.sizeDisplayData.category,
    variant: variant.toString(),
    position: index + 1,
    dimension2,
    dimension10: campaignId.toString()
  };
};

export const dataLayerPush = (analytic) => {
  if (window && window.dataLayer && window.dataLayer.push) {
    window.dataLayer.push(analytic);
  }
};
