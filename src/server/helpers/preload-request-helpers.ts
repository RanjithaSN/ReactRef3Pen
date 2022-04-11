
const PRELOAD_ASSETS = [
  'studentLandingPage-student-landing-page-contextual-jsx',
  'resetPassword-reset-password-contextual',
  'login-desktopLogin-login-modal-contextual',
  'pageLayout-page-layout-contextual',
  'authenticationLayout-authentication-layout~getHelp-get-help-contextual~pageLayout-page-layout-contextual',
  'aboutPage-about-page-contextual~environment-environment-contextual~forgotPassword-forgot-password-co',
  'landingPage-landing-page-contextual~studentLandingPage-student-landing-page-contextual-jsx',
  'landingPage-landing-page-contextual~roamingDetails-roaming-details-contextual~studentLandingPage-stu'
];

export interface Stats {
  publicPath: string;
  assetsByChunkName: {
    [asset: string]: string[]
  }
  assets: {
    name: string;
  }[];
}


const createPreloadRequestLinks = (stats: Stats) => {
  return PRELOAD_ASSETS.map((assetPart) => {
    const cssAsset = stats.assets.find((asset) => {
      return asset.name.search(assetPart) === 0 && asset.name.substring(asset.name.length - 3) === 'css';
    });
    if (!cssAsset) {
      return '';
    }
    return `<link rel="preload" href="${stats.publicPath}${cssAsset.name}" as="style">`;
  });
};

export default createPreloadRequestLinks;
