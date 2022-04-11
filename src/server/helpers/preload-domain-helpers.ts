const PRELOAD_DOMAINS = [
  'https://api.raygun.io',
  'https://w.usabilla.com',
  'https://api2.csgjourney.com',
  'https://services.prd3.contentdirect.tv',
  'https://ib.adnxs.com',
  'https://metadata.prd3.contentdirect.tv',
  'https://www.googletagmanager.com',
  'https://stats.g.doubleclick.net',
  'https://cdn.raygun.io',
  'https://sc-static.net',
  'https://www.google-analytics.com',
  'https://www.gstatic.com',
  'https://googleads.g.doubleclick.net',
  'https://www.google.se',
  'https://www.googleadservices.com',
  'https://www.google.com',
  'https://cdn.kitewheel.com',
  'https://cdn.mookie1.com',
  'https://www.facebook.com',
  'https://cdn.decibelinsight.net',
  'https://connect.facebook.net',
  'https://acdn.adnxs.com',
  'https://se-gmtdmp.mookie1.com'
];

const createPreloadLinks = () => PRELOAD_DOMAINS.map((link) => `<link rel="preconnect" href="${link}">`);

export default createPreloadLinks;