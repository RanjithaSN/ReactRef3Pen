import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ClearApiFault } from 'selfcare-core/src/redux/fault/fault.actions';
import { Fault } from 'selfcare-core/src/redux/fault/fault.selectors';
import { RetrieveCodes } from 'selfcare-core/src/redux/metadata/codes/codes.actions';
import { IsLoading } from 'selfcare-core/src/redux/metadata/codes/codes.selectors';
import { ExistingSupportedPaymentInstruments, PaymentInstrumentIsLoading } from 'selfcare-core/src/redux/paymentInstrument/payment.instrument.selectors';
import { SelectedLocale } from 'selfcare-core/src/redux/preferences/preferences.selectors';
import { ClearCalculateOrderQuote } from 'selfcare-core/src/redux/quote/quote.actions';
import { IsQuotingOrder, QuoteCalculated } from 'selfcare-core/src/redux/quote/quote.selectors';
import { RetrieveSavedCart } from 'selfcare-core/src/redux/savedCart/saved.cart.actions';
import { IsSavedCartLoaded, SavedShoppingCartItems } from 'selfcare-core/src/redux/savedCart/saved.cart.selectors';
import { UpdateIsBenifyDistributionChannel } from 'selfcare-core/src/redux/settings/settings.actions';
import { IsSubmitOrderLoaded, IsSubmittingOrder } from 'selfcare-core/src/redux/submitOrder/submit.order.selectors';
import { SubscriberIsLoaded } from 'selfcare-core/src/redux/subscriber/subscriber.selectors';
import { UpdateSubscriberIsLoading } from 'selfcare-core/src/redux/subscriberInformation/subscriber.information.selectors';
import { RetrieveSupportRequestTypes } from 'selfcare-core/src/redux/supportRequest/support.request.actions';
import { CartIsMobile } from '../../../redux/cart/cart.selectors';
import { CalculateQuote, SubmitOrder } from '../../../redux/checkout/checkout.actions';
import { DisplayListOfQuoteItems, OneTimeAndRecurringQuoteTotals, QuoteHasBenify, QuoteHasPlay } from '../../../redux/checkout/checkout.selectors';
import { UpdateSubscriberFormValues } from '../../../redux/createSubscriber/create.subscriber.actions';
import { CreateSubscriberFormValues, GdprConsentArray, PromotionalConsentIds } from '../../../redux/createSubscriber/create.subscriber.selectors';
import { OpenLoginModal } from '../../../redux/login/login.actions';
import { DefaultPaymentInstrument } from '../../../redux/makePayment/make.payment.selectors';
import { OrderIsPortIn } from '../../../redux/orderFlow/attributes/attributes.order.flow.selectors';
import { UpdateProspectSubscriber } from '../../../redux/orderFlow/subscriberInformation/subscriber.information.actions';
import { ProspectIsAvailable } from '../../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import { SetIsExistingUser } from '../../../redux/ordering/ordering.actions';
import { IsExistingUser, IsInBundleOrderFlow, OptionsViewDataInShoppingCart } from '../../../redux/ordering/ordering.selectors';
import { Create3DS1PaymentInstrument, SetPaymentInstrumentDefault, UpdatePaymentInstrumentValues } from '../../../redux/paymentInstrument/payment.instrument.form.actions';
import { SetAndValidateSection } from '../../../redux/progressStepper/progress.stepper.actions';
import { CurrentSectionId } from '../../../redux/progressStepper/progress.stepper.selectors';
import { Set3DS1RedirectUrl, Submit3DS1OrderFinalRequest } from '../../../redux/threeDS/threeDS.actions';
import { Current3DS1MDValue, Processing3DS, ThreeDS1SubmitOrderRedirectUrl } from '../../../redux/threeDS/threeDS.selectors';
import { RetrieveWalletOnce } from '../../../redux/wallet/wallet.actions';
import Checkout from './checkout';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  codesLoading: IsLoading,
  consentArray: GdprConsentArray,
  current3DS1MDValue: Current3DS1MDValue,
  currentSectionId: CurrentSectionId,
  defaultPaymentInstrument: DefaultPaymentInstrument,
  hasBenifyInCart: QuoteHasBenify,
  hasPennyPlayInCart: QuoteHasPlay,
  isExistingUser: IsExistingUser,
  isInBundleOrderFlow: IsInBundleOrderFlow,
  isLoggedIn: SubscriberIsLoaded,
  isMobileOffer: CartIsMobile,
  isPortIn: OrderIsPortIn,
  isProcessing3DS: Processing3DS,
  isProspect: ProspectIsAvailable,
  isProspectSubscriberCreating: UpdateSubscriberIsLoading,
  isQuotingOrder: IsQuotingOrder,
  isSubmittingOrder: IsSubmittingOrder,
  isSubmitOrderLoaded: IsSubmitOrderLoaded,
  optionsViewDataInShoppingCart: OptionsViewDataInShoppingCart,
  paymentInstrumentIsLoading: PaymentInstrumentIsLoading,
  paymentMethods: ExistingSupportedPaymentInstruments,
  promotionalConsentIds: PromotionalConsentIds,
  quoteCalculated: QuoteCalculated,
  quoteItemsList: DisplayListOfQuoteItems,
  quoteTotals: OneTimeAndRecurringQuoteTotals,
  savedCartIsLoaded: IsSavedCartLoaded,
  savedCartItems: SavedShoppingCartItems,
  selectedLocale: SelectedLocale,
  subscriberFormFields: CreateSubscriberFormValues,
  threeDSSubmitOrderRedirectUrl: ThreeDS1SubmitOrderRedirectUrl
});

const mapActionsToProps = {
  calculateOrderQuote: CalculateQuote,
  clearFault: ClearApiFault,
  clearOrderQuote: ClearCalculateOrderQuote,
  createPaymentInstrument: Create3DS1PaymentInstrument,
  retrieveCodes: RetrieveCodes,
  retrieveSavedCart: RetrieveSavedCart,
  retrieveSupportRequestTypes: RetrieveSupportRequestTypes,
  retrieveWallet: RetrieveWalletOnce,
  set3DS1RedirectUrl: Set3DS1RedirectUrl,
  setIsExistingUser: SetIsExistingUser,
  setPaymentInstrumentDefault: SetPaymentInstrumentDefault,
  setSectionId: SetAndValidateSection,
  submit3DS1OrderFinalRequest: Submit3DS1OrderFinalRequest,
  submitOrder: SubmitOrder,
  updateIsBenifyDistributionChannel: UpdateIsBenifyDistributionChannel,
  updatePaymentInstrumentValues: UpdatePaymentInstrumentValues,
  updateSubscriber: UpdateProspectSubscriber,
  updateSubscriberFormValues: UpdateSubscriberFormValues,
  openLoginModal: OpenLoginModal
};

export default connect(mapStateToProps, mapActionsToProps)(Checkout);
