export default (fn, time) => {
  let timeout;

  return () => {
    /*eslint-disable */
        // suppressing eslint error for arguments not being defined
        const functionCall = () => fn.apply(this, arguments);
        /* eslint-enable */

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
