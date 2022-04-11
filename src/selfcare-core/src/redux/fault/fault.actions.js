export const FaultTypes = {
  API_FAULT: 'API_FAULT',
  CLEAR_API_FAULT: 'CLEAR_API_FAULT'
};

export const ApiFault = (fault, requestObject) => {
  return {
    type: FaultTypes.API_FAULT,
    payload: fault,
    requestObject
  };
};

export const ClearApiFault = () => {
  return {
    type: FaultTypes.CLEAR_API_FAULT
  };
};
