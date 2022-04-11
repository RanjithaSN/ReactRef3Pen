import { Stats } from './icon-helpers';

/**
 * We are doing this since manifest gets fingerprinted and we can't use
 * hardcoded names
 */
export const getManifestUrl = (stats?: Stats) => {
  if (!stats) {
    return 'manifest.json';
  }
  const manifest = stats.assets.find((asset) => asset.name.search('manifest') === 0);
  return manifest ? `${stats.publicPath}${manifest.name}` : 'manifest.json';
};
