import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { IsLoadingInventoryItems } from '@selfcare/core/redux/searchInventory/search.inventory.selectors';
import { ClearMSISDNInventory } from '@selfcare/core/redux/searchInventory/search.inventory.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SetBroadbandAttributes, UpdateAttributeValue } from '../../../../redux/orderFlow/attributes/attributes.order.flow.action';
import { BroadbandAttributes, OfferingAttributes, PortInNumberInvalid } from '../../../../redux/orderFlow/attributes/attributes.order.flow.selectors';
import { MoreConfigurationToDo } from '../../../../redux/orderFlow/offeringContext/offering.context.selectors';
import { NavigateFromAttributes } from '../../../../redux/orderFlow/order.flow.actions';
import { ActiveOfferInstanceId, ProductIdentifier } from '../../../../redux/orderFlow/order.flow.selectors';
import { CreateProspect } from '../../../../redux/orderFlow/subscriberInformation/subscriber.information.actions';
import { ProspectIsAvailable, UserIsAvailable } from '../../../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import { CurrentOfferIsMobile, CurrentOfferIsBroadband, IsInBundleOrderFlow, OptionsViewDataInShoppingCart } from '../../../../redux/ordering/ordering.selectors';
import { RetrieveProductMetadata, UpdateBroadbandActivationDate } from '../../../../redux/products/products.actions';
import { ProductDefaultValues } from '../../../../redux/products/products.selectors';
import { SetAndValidateSection } from '../../../../redux/progressStepper/progress.stepper.actions';
import CustomizeOfferComponent from './customize.offer';


const mapStateToProps = createStructuredSelector({
  activeOfferInstanceId: ActiveOfferInstanceId,
  apiFault: Fault,
  attributesForCurrentDecision: OfferingAttributes,
  broadbandAttributes: BroadbandAttributes,
  hasMoreConfig: MoreConfigurationToDo,
  haveUser: UserIsAvailable,
  productDefaults: ProductDefaultValues,
  isInBundleOrderFlow: IsInBundleOrderFlow,
  isMobileOffer: CurrentOfferIsMobile,
  isBroadbandOffer: CurrentOfferIsBroadband,
  isMobileAttributesLoading: IsLoadingInventoryItems,
  isProspect: ProspectIsAvailable,
  productIdentifier: ProductIdentifier,
  optionsViewDataInShoppingCart: OptionsViewDataInShoppingCart,
  portInNumberInvalid: PortInNumberInvalid
});

const mapActionsToProps = {
  createProspect: CreateProspect,
  clearMSISDNInventory: ClearMSISDNInventory,
  setBroadbandAttributes: SetBroadbandAttributes,
  setSectionId: SetAndValidateSection,
  nextPage: NavigateFromAttributes,
  retrieveProductMetadata: RetrieveProductMetadata,
  updateAttributeValue: UpdateAttributeValue,
  updateBroadbandActivationDate: UpdateBroadbandActivationDate
};

export default connect(mapStateToProps, mapActionsToProps)(CustomizeOfferComponent);
