export const Location = (_state, props) => {
  if (props && (props.location || props.currentLocation)) {
    return props.location || props.currentLocation;
  }
  throw new Error('router.selectors.jsx::selectLocation. Unable to determine location! component props didn\'t contain location or currentLocation.');
};
