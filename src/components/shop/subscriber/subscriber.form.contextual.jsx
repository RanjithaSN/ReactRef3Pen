import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { UpdateSubscriberFormValues } from '../../../redux/createSubscriber/create.subscriber.actions';
import { ClientValidation, SubscriberFormFieldsFormatted, SubscriberLoggedIn } from '../../../redux/createSubscriber/create.subscriber.selectors';
import SubscriberForm from './subscriber.form.withFormik';

const mapStateToProps = createStructuredSelector({
  hasSubscriber: SubscriberLoggedIn,
  subscriberFormFields: SubscriberFormFieldsFormatted,
  validationFunctions: ClientValidation
});
const mapActionsToProps = {
  retrieveCodes: RetrieveCodes,
  updateSubscriberFormValues: UpdateSubscriberFormValues
};

export default connect(mapStateToProps, mapActionsToProps)(SubscriberForm);
