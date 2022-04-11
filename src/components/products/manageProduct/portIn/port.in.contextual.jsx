import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { OfferingContextsByInstanceId } from '@selfcare/core/redux/offeringContext/offering.context.selectors';
import { CancelPortInRequest, UpdatePortInRequest } from '@selfcare/core/redux/portIn/portin.actions';
import { PortInIsLoading } from '@selfcare/core/redux/portIn/portin.selectors';
import { SubscriberSSN } from '@selfcare/core/redux/subscriber/subscriber.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CreateSupportRequest, SearchSupportRequest } from 'selfcare-core/src/redux/supportRequest/support.request.actions';
import {
  PortInCurrentMSISDNField,
  PortInDateField,
  PortInPortToMSISDNField,
  PortInSsnField,
  ValidatedPortInDateField
} from '@selfcare/core/redux/supportRequest/support.request.selectors';
import { UpdateAttributeValue } from '../../../../redux/orderFlow/attributes/attributes.order.flow.action';
import { ActiveOfferInstanceId, ProductIdentifier } from '../../../../redux/orderFlow/order.flow.selectors';
import { RetrieveProductMetadata, UpdateCustomPortInNumber } from '../../../../redux/products/products.actions';
import { EditedPortInNumberInvalid, IsHandlingProductAction, PortInNumberAdditionalPropertyValueId, SelectedProduct, SelectedProductPortInNumber, ValidatePortInDateOnSupportRequests } from '../../../../redux/products/products.selectors';
import { RecentlyClosedPortInRequest, RecentlyNewOrOpenPortInRequest } from '../../../../redux/supportRequest/support.request.selectors';
import PortIn from './port.in';
import { SetContextPageData } from '../../../../redux/inAccountHelp/in.accounthelp.actions';

const mapStateToProps = createStructuredSelector({
  isHandlingProductAction: IsHandlingProductAction,
  isPortInNumberInvalid: EditedPortInNumberInvalid,
  portInCurrentMSISDNField: PortInCurrentMSISDNField,
  portInDateField: PortInDateField,
  portInIsLoading: PortInIsLoading,
  portInNumber: SelectedProductPortInNumber,
  portInPortToMSISDNField: PortInPortToMSISDNField,
  portInSsn: PortInSsnField,
  productIdentifier: ProductIdentifier,
  recentlyClosedPortInRequest: RecentlyClosedPortInRequest,
  recentlyNewOrOpenPortInRequest: RecentlyNewOrOpenPortInRequest,
  selectedProduct: SelectedProduct,
  subscriberSSN: SubscriberSSN,
  validatedPortInDateField: ValidatedPortInDateField,
  offeringContextsByInstanceId: OfferingContextsByInstanceId,
  activeOfferInstanceId: ActiveOfferInstanceId,
  validatePortInDate: ValidatePortInDateOnSupportRequests,
  portInNumberAdditionalPropertyValueId: PortInNumberAdditionalPropertyValueId
});

const mapActionsToProps = {
  cancelPortInRequest: CancelPortInRequest,
  createSupportRequest: CreateSupportRequest,
  retrieveCodes: RetrieveCodes,
  retrieveProductMetadata: RetrieveProductMetadata,
  updateAttributeValue: UpdateAttributeValue,
  updateCustomPortInNumber: UpdateCustomPortInNumber,
  updatePortInRequest: UpdatePortInRequest,
  searchSupportRequest: SearchSupportRequest,
  setContextPageData: SetContextPageData
};

export default connect(mapStateToProps, mapActionsToProps)(PortIn);
