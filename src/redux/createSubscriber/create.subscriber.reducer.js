import Immutable from 'seamless-immutable';
import { CreateSubscriberActionTypes } from './create.subscriber.actions';

export const INITIAL_STATE = new Immutable({
  formValues: null,
  formValuesValid: false,
  localStorageChecked: false
});

export default function CreateSubscriberReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case CreateSubscriberActionTypes.UPDATE_SUBSCRIBER_FORM_VALUES:
    return state.set('formValues', {
      ...state.formValues,
      ...payload.values
    }).set('formValuesValid', payload.isValid);
  case CreateSubscriberActionTypes.LOCAL_STORAGE_CHECKED:
    return state.set('localStorageChecked', true);
  default:
    return state;
  }
}
