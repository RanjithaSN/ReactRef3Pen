const ENTER_KEY_CODE = 13;

export const onEnter = (cb) => {
  return (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === ENTER_KEY_CODE) {
      cb(event);
    }
  };
};
