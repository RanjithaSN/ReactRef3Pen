import MasterCardLogo from '../../paymentInstrument/creditCard/logos/mastercard.png';
import VisaLogo from '../../paymentInstrument/creditCard/logos/visa.png';
import ClimateLogo from './logoBadge/logos/climate.png';
import NetflixLogo from './logoBadge/logos/netflix.png';
import P3Logo from './logoBadge/logos/p3.png';
import YoutubeHDLogo from './logoBadge/logos/youtube.png';

let webSupported = false;
if (window.Modernizr) {
  window.Modernizr.on('webp', (supported) => {
    webSupported = supported;
  });
}

export const trustedEntitiesList = [
  {
    ref: 'neutrala',
    productType: 0,
    text: 'SVERIGES ENDA KLIMATNEUTRALA MOBILOPERATÖR'
  },
  {
    ref: 'p3',
    productType: 0,
    text: 'TEST-VINNANDE 4G'
  },
  {
    ref: 'netflix',
    productType: 1,
    text: 'TOPPSKIKTET ENLIGT NETFLIX'
  },
  {
    ref: 'youtube',
    productType: 1,
    text: 'BÄST FÖR YOUTUBE HD'
  }
];

const fetchWebpOrNormalImage = (image) => {
  if (webSupported) {
    return `${image}.webp`;
  }
  return image;
};

export const getTrustedEntityLogo = (type) => {
  switch (type) {
  case 'visa': return fetchWebpOrNormalImage(VisaLogo);
  case 'mastercard': return fetchWebpOrNormalImage(MasterCardLogo);
  case 'p3': return fetchWebpOrNormalImage(P3Logo);
  case 'neutrala': return fetchWebpOrNormalImage(ClimateLogo);
  case 'netflix': return fetchWebpOrNormalImage(NetflixLogo);
  case 'youtube': return fetchWebpOrNormalImage(YoutubeHDLogo);
  default:
    return '';
  }
};


export const trustedCards = [
  {
    ref: 'mastercard',
    image: getTrustedEntityLogo('mastercard')
  },
  {
    ref: 'visa',
    image: getTrustedEntityLogo('visa')
  }
];
