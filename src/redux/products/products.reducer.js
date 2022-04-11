import { write } from '@selfcare/core/helpers/storage/local.storage';
import Immutable from 'seamless-immutable';
import { LOCAL_SWEDISH_MOBILE_REGEX } from '../../constants/validation.constants';
import { ProductTypes } from './products.actions';

export const INITIAL_STATE = new Immutable({
  data: {
    selectedProduct: null,
    customPortInNumber: null,
    customPortInNumberInvalid: false,
    productMetadata: null
  }
});

export default function ProductsReducer(state = INITIAL_STATE, { payload = {}, type }) {
  switch (type) {
  case ProductTypes.ModifyScheduledDate:
    return state
      .setIn(['data', 'selectedProductLoaded'], payload);
  case ProductTypes.UpdateSelectedProduct:
    return state
      .setIn(['data', 'selectedProductId'], payload.id);
  case ProductTypes.RetrieveProductMetadata.SUCCESS:
    return state
      .setIn(['data', 'productMetadata'], payload);
  case ProductTypes.UpdateCustomPortInNumber: {
    const mobileRegex = new RegExp(LOCAL_SWEDISH_MOBILE_REGEX.pattern, LOCAL_SWEDISH_MOBILE_REGEX.flag);
    const customPortInNumberInvalid = !(mobileRegex.test(payload.customPortInNumber));

    return state
      .setIn(['data', 'customPortInNumber'], payload.customPortInNumber)
      .setIn(['data', 'customPortInNumberInvalid'], customPortInNumberInvalid);
  }
  case ProductTypes.UpdateBroadbandActivationDate: {
    write('broadbandActivationDate', payload);
    return state.setIn(['data', 'broadbandActivationDate'], payload);
  }
  default:
    return state;
  }
}
