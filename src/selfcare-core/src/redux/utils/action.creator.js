export const CreateAsyncFromString = (str) => {
  return {
    BEGIN: `${str}.BEGIN`,
    SUCCESS: `${str}.SUCCESS`,
    FAILURE: `${str}.FAILURE`,
    ASYNC: `${str}.ASYNC`
  };
};
