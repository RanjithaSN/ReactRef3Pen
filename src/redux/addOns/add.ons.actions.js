import { SearchCatalog } from '@selfcare/core/redux/catalog/catalog.actions';
import { ConvergentBillerSummaryServices } from '@selfcare/core/redux/convergentBillerSummary/convergent.biller.summary.selectors';
import { ClearApiFault } from '@selfcare/core/redux/fault/fault.actions';
import { ClearSavedCart, SaveProductCart } from '@selfcare/core/redux/savedCart/saved.cart.actions';
import pathOr from 'ramda/src/pathOr';
import { CartHasOffers } from '../cart/cart.selectors';
import { ServiceId, ServiceIdentifierValue } from '../subscriberOfferings/subscriber.offerings.selectors';
import { AddOnCode } from './add.ons.selectors';

export const FetchAddOns = (service, sortBy, actions) => {
  return async (dispatch, getState) => {
    dispatch(ClearApiFault());
    const productClassification = AddOnCode(getState());
    const serviceId = ServiceId(getState(), {
      service
    });

    const payload = {
      serviceId,
      sortBy,
      productClassification
    };

    if (serviceId) {
      await dispatch(SearchCatalog(payload, actions));
    }
  };
};


export const UpdateAddOn = (productServiceIdentifier, service, addOnId, plans) => (
  async (dispatch, getState) => {
    dispatch(ClearApiFault());

    if (CartHasOffers(getState())) {
      await dispatch(ClearSavedCart());
    }

    const details = {
      service
    };

    const summaryServices = ConvergentBillerSummaryServices(getState());
    const foundService = summaryServices.find((summaryService) => pathOr(null, ['ServiceIdentifier', 'Value'], summaryService) === productServiceIdentifier);
    const serviceIdentifierValueLookup = ServiceIdentifierValue(getState(), details);
    const serviceId = ServiceId(getState(), details);
    const selectedItems = plans.map(({ id, quantity }) => ({
      ProductId: addOnId,
      PricingPlanId: id,
      Quantity: quantity,
      ServiceFeatureProductAssociation: {
        ServiceInstanceId: pathOr(null, ['ServiceIdentifier', 'ServiceInstanceId'], foundService),
        ServiceId: serviceId.toString(),
        ServiceIdentifierValue: pathOr(serviceIdentifierValueLookup, ['ServiceIdentifier', 'Value'], foundService)
      }
    }));

    await dispatch(SaveProductCart(selectedItems));
  }
);
