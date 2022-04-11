import classNames from 'classnames';
import PropTypes from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import React from 'react';
import Heading from 'selfcare-ui/src/components/heading/heading';
import './progress.stepper.scss';

const getStepperCircle = (thisStep, currentSectionId) => {
  let step;
  if (thisStep.id < currentSectionId) {
    step = (<div className="c-progress-stepper__step c-progress-stepper__step--completed" />);
  } else if (thisStep.id === currentSectionId) {
    step = (<div className="c-progress-stepper__step c-progress-stepper__step--current" />);
  } else {
    step = (<div className="c-progress-stepper__step c-progress-stepper__step--uncompleted" />);
  }
  return (
    <div key={thisStep.id} className="c-progress-stepper__block">
      {step}
    </div>
  );
};

const ProgressStepper = ({ className, currentSectionId, steps }) => {
  const totalSteps = steps.length;
  const label = pathOr(null, ['label'], steps.find((element) => element.id === currentSectionId));

  return (
    <div className={classNames('c-progress-stepper', className)}>
      {[...Array(totalSteps)].map((item, $index) => {
        return getStepperCircle(steps[$index], currentSectionId);
      })}
      <Heading className="c-progress-stepper__block-label" category="minor" tone="normal">{label}</Heading>
    </div>
  );
};

ProgressStepper.displayName = 'ProgressStepper';
ProgressStepper.propTypes = {
  /** Use to pass a custom class name to the component. */
  className: PropTypes.string,
  /** Current step that the user is on for this user flow. */
  currentSectionId: PropTypes.number.isRequired,
  /** The label next to the stepper marks */
  steps: PropTypes.arrayOf(PropTypes.shape({
    /** The unique identifier for the step */
    id: PropTypes.number,
    /** The label for the step */
    label: PropTypes.string
  }))
};

export default ProgressStepper;
