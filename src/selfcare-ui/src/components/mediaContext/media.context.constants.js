import breakpoints from '../../_variables.scss';

export const MEDIA_CONTEXT_SIZES = {
  SMALL: 'small',
  NOTSMALL: 'notsmall',
  MEDIUM: 'medium',
  LARGE: 'large',
  MAX: 'max'
};

export const MEDIA_CONTEXT_MAP = {
  small: `screen and (max-width: ${breakpoints.mqMediumStart})`,
  notsmall: `screen and (min-width: ${breakpoints.mqMediumStart})`,
  medium: `screen and (min-width: ${breakpoints.mqMediumStart})`,
  large: `screen and (min-width: ${breakpoints.mqLargeStart})`,
  max: `screen and (min-width: ${breakpoints.mqMaxWidth})`
};
