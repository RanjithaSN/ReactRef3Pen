import Immutable from 'seamless-immutable';
import { ProgressStepperTypes } from './progress.stepper.actions';

export const INITIAL_STATE = new Immutable({
  currentSectionId: 0
});

export default function setSectionId(state = INITIAL_STATE, { payload, type }) {
  switch (type) {
  case ProgressStepperTypes.SET_SECTION_ID:
    return state.set('currentSectionId', payload);
  default:
    return state;
  }
}
