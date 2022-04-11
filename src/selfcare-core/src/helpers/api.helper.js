/* eslint no-param-reassign: off */
export const removeEmptyStrings = (obj) => {
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (val === '') {
      delete obj[key];
    } else if (Array.isArray(val)) {
      obj[key] = val.map(removeEmptyStrings);
    } else if (typeof val === 'object') {
      obj[key] = removeEmptyStrings(val);
    }
  });
  return obj;
};
