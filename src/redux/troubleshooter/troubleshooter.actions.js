import { GetHistory } from './troubleshooter.selectors';

export const TroubleshooterTypes = {
  PushToHistory: 'PUSH_TO_HISTORY'
};

export const PushToHistory = (node) => {
  return (dispatch, getState) => {
    const history = GetHistory(getState());
    const nodeArray = [];
    nodeArray.push(node);
    const completeHistory = nodeArray.concat(history);
    dispatch({
      type: TroubleshooterTypes.PushToHistory,
      payload: completeHistory
    });
  };
};
