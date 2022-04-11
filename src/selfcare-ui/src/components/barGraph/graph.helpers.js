export const getPath = (x, y, width, height) => {
  return `M ${x},${y} h ${width} v ${height} h ${-width} Z`;
};
/** Array to hold the current color palette */
export const colorPallette = [
  'c-bar--primary',
  'c-bar--secondary',
  'c-bar--tertiary',
  'c-bar--alternative'
];

export const colorPicker = (data, dataKey) => {
  const i = data.indexOf(dataKey) % colorPallette.length;
  return colorPallette[i];
};
