import { FixedActivationRequest } from '@selfcare/core/redux/activation/activation.actions';
import { ActivationIsLoading } from '@selfcare/core/redux/activation/activation.selectors';
import { Fault } from '@selfcare/core/redux/fault/fault.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ActivateProductModal from './activate.product.modal';

const mapStateToProps = createStructuredSelector({
  isLoading: ActivationIsLoading,
  apiFault: Fault
});

const mapActionsToProps = {
  fixedActivationRequest: FixedActivationRequest
};

export default connect(mapStateToProps, mapActionsToProps)(ActivateProductModal);
