import { INPUT_SIZE } from 'selfcare-ui/src/components/input/input';

export const getFieldSize = (numberOfFields, fullWidth) => {
  if (fullWidth) {
    switch (numberOfFields) {
    case 3:
      return INPUT_SIZE.SMALL;
    case 2:
      return INPUT_SIZE.MEDIUM;
    case 1:
    default:
      return INPUT_SIZE.FULL;
    }
  } else {
    switch (numberOfFields) {
    case 3:
      return INPUT_SIZE.X_SMALL;
    case 2:
      return INPUT_SIZE.SMALL;
    case 1:
    default:
      return INPUT_SIZE.LARGE;
    }
  }
};
