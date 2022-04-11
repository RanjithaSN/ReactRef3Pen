import PropTypes from 'prop-types';

export const apiFaultPropTypes = PropTypes.shape({
  translatedMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
});
