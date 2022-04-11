import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CurrentSectionId, OrderFlowSteps } from '../../../redux/progressStepper/progress.stepper.selectors';
import ProgressStepper from './progress.stepper';

const mapStateToProps = createStructuredSelector({
  currentSectionId: CurrentSectionId,
  steps: OrderFlowSteps
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(ProgressStepper);
