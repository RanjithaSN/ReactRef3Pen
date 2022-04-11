import { FaultTypes } from '@selfcare/core/redux/fault/fault.actions';
import { SubmitOrderTypes } from '@selfcare/core/redux/submitOrder/submit.order.actions';
import eventBus from './event.bus';
import widgetEvents from './widget.events';

// https://redux.js.org/advanced/middleware#the-final-approach
const eventMiddleware = () => next => action => { // eslint-disable-line
  if (action) {
        switch (action.type) { // eslint-disable-line
    case SubmitOrderTypes.SUBMIT_ORDER.SUCCESS:
      eventBus.publish(widgetEvents.ORDER_COMPLETE, action.payload);
      break;
    case FaultTypes.API_FAULT:
      eventBus.publish(widgetEvents.FAULT, action.payload);
      break;
    }
  }

  return next(action);
};

export default eventMiddleware;
