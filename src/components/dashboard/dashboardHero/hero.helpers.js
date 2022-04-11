const filenameLightVariant = 'LIGHT';

export const getColorVariantFromFilename = (imageSrc) => {
  const isLight = imageSrc && imageSrc.includes(filenameLightVariant);
  return isLight ? 'light' : 'dark';
};
