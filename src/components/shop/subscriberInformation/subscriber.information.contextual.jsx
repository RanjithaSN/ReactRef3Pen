import {Fault} from '@selfcare/core/redux/fault/fault.selectors';
import {FetchSSNDetails} from '@selfcare/core/redux/subscriberInformation/subscriber.information.actions';
import {LegalName, PostalCode, SsnLookupHasError, SsnLookupIsLoaded, SsnLookupIsLoading} from '@selfcare/core/redux/subscriberInformation/subscriber.information.selectors';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {RetrieveSavedCart} from 'selfcare-core/src/redux/savedCart/saved.cart.actions';
import {IsSavedCartLoaded, SavedShoppingCartItems} from 'selfcare-core/src/redux/savedCart/saved.cart.selectors';
import {CreateSubscriberFormValues, CreateSubscriberFormValuesValid} from '../../../redux/createSubscriber/create.subscriber.selectors';
import {OpenLoginModal} from '../../../redux/login/login.actions';
import {ProspectUpdateError} from '../../../redux/orderFlow/subscriberInformation/subscriber.information.selectors';
import {OptionsViewDataInShoppingCart} from '../../../redux/ordering/ordering.selectors';
import {SetAndValidateSection} from '../../../redux/progressStepper/progress.stepper.actions';
import {CurrentSectionId} from '../../../redux/progressStepper/progress.stepper.selectors';
import {SSNCheck} from '../../../redux/studentOffers/studentOffers.actions';
import {GetStudentBroadbandOfferId, GetStudentMobileOfferId, IsStudentValid} from '../../../redux/studentOffers/studentOffers.selectors';
import SubscriberInformation from './subscriber.information';

const mapStateToProps = createStructuredSelector({
  apiFault: Fault,
  currentSectionId: CurrentSectionId,
  createSubscriberFormValues: CreateSubscriberFormValues,
  isValid: CreateSubscriberFormValuesValid,
  name: LegalName,
  postalCode: PostalCode,
  prospectUpdateError: ProspectUpdateError,
  savedCartIsLoaded: IsSavedCartLoaded,
  savedCartItems: SavedShoppingCartItems,
  ssnLookupHasError: SsnLookupHasError,
  ssnLookupIsLoaded: SsnLookupIsLoaded,
  ssnLookupIsLoading: SsnLookupIsLoading,
  optionsViewDataInShoppingCart: OptionsViewDataInShoppingCart,
  studentMobileOfferId: GetStudentMobileOfferId,
  studentBroadbandOfferId: GetStudentBroadbandOfferId,
  isStudentValid: IsStudentValid
});

const mapActionsToProps = {
  lookupSSNInformation: FetchSSNDetails,
  studentSSNcheck: SSNCheck,
  openLoginModal: OpenLoginModal,
  setSectionId: SetAndValidateSection,
  retrieveSavedCart: RetrieveSavedCart
};

export default connect(mapStateToProps, mapActionsToProps)(SubscriberInformation);