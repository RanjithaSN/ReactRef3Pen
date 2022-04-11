export interface Stats {
  publicPath: string;
  assets: {
    name: string;
  }[];
}

/**
 * Same reason as above. This is done to make sure hashes in icon names are taken into account
 */
export const getAppIcons = (stats?: Stats) => {
  if (!stats) {
    return '';
  }
  return stats.assets
    .filter((asset) => asset.name.search('icon_') === 0)
    .map((icon) => icon.name)
    .map((iconName) => {
      const match = iconName.match(/icon_(\d+)x(\d+)\..*\.png/);
      if (match && match.length > 0) {
        return (
          `<link rel="icon" type="image/png" href="${stats.publicPath}${iconName}" sizes="${match[1]}x${match[1]}" />` +
          `<link rel="apple-touch-icon" href="${stats.publicPath}${iconName}" />`
        );
      }
      return '';
    })
    .join('');
};

/**
 * Set the icon with dimensions 192x192 as the default favicon
 */
export const getDefaultFavIcon = (stats?: Stats) => {
  if (!stats) {
    return '';
  }
  let defaultIcon = '';
  stats.assets
    .filter((asset) => asset.name.search('icon_') === 0)
    .forEach((icon) => {
      const iconName = icon.name;
      const match = iconName.match(/icon_(\d+)x(\d+)\..*\.png/);
      if (match && match.length > 0) {
        if (parseInt(match[1], 10) === 192) {
          defaultIcon = iconName;
        }
      }
    });
  return `${stats.publicPath}${defaultIcon}`;
};
