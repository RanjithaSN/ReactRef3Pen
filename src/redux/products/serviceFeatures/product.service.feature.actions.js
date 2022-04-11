import { CONFIGURATION } from '@selfcare/core/constants/configuration.constants';
import { PRODUCT_SORT_BY } from '@selfcare/core/redux/catalog/catalog.constants';
import { RetrieveProduct } from '@selfcare/core/redux/metadata/products/products.actions';
import { RetrieveSingleProductContext } from '@selfcare/core/redux/productContext/product.context.actions';
import { FetchAddOns } from '../../addOns/add.ons.actions';
import { AllProducts } from '../products.selectors';
import { InternationalRoamingId, RoamLikeHomeId, TopUpId } from './product.service.feature.selectors';

export const RetrieveSingleProduct = (productId) => (
  (dispatch) => {
    return Promise.all([dispatch(RetrieveProduct(productId)),
      dispatch(RetrieveSingleProductContext(productId))
    ]);
  }
);

export const FetchMobileProductAddOns = () => {
  return (dispatch, getState) => {
    if (!TopUpId(getState())) {
      return dispatch(FetchAddOns(CONFIGURATION.ATTRIBUTE_INFO_FOR_CONNECTED_OPTION, PRODUCT_SORT_BY.RELEVANCE));
    }
  };
};

export const RetrieveProductAddOns = () => {
  return async (dispatch, getState) => {
    const topUpId = TopUpId(getState());
    if (topUpId) {
      const roamLikeHomeId = RoamLikeHomeId(getState());
      const internationalRoamId = InternationalRoamingId(getState());
      const idArray = [topUpId];

      if (roamLikeHomeId) {
        idArray.push(roamLikeHomeId);
      }
      if (internationalRoamId) {
        idArray.push(internationalRoamId);
      }

      await Promise.all(idArray.map((product) => (dispatch(RetrieveSingleProduct(product)))));
    }
  };
};

export const RetrieveSingleProductForEachBroadbandOffering = () => {
  return async (dispatch, getState) => {
    const products = AllProducts(getState());
    const broadbandProducts = products.filter((product) => {
      return product.isBroadband && product.hasPrimaryOption;
    });

    broadbandProducts.forEach(async (product) => {
      const primaryOption = product.options.find((item) => {
        return item.OfferingOptionPriceId === product.hasPrimaryOption;
      });

      await dispatch(RetrieveSingleProduct(primaryOption.ProductId));
    });
  };
};
