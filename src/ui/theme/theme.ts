import { color, weight, rhythm, tint } from './theme.helpers';

export const ICON_SIZE = 24;

const pennyTheme: any = {
  font: {
    fontBrand: 'PennyDisplay',
    fontNonBrand: 'PennyText',
    fontNonBrandSecondary: 'PennyText',
    pennyLetterSpacingSmall: '0.16px',
    pennyLetterSpacingNormal: '0.32px'
  },
  lineHeight: {
    brandLoud: 5.2,
    brandNormal: 3.25,
    brandQuiet: 2.25,
    majorNormal: 1.5,
    majorQuiet: 1.25,
    minorNormal: 1.25,
    minorQuiet: 1
  },
  rhythm: {
    alpha: 3.75,
    beta: 2.5,
    delta: 1.25,
    gamma: 0.9375,
    theta: 0.75,
    omega: 6,
    eta: 2.25,
    mu: 1.5
  },
  buttonMinWidth: {
    singleButtonMinWidth: '345px',
    doubleButtonMinWidth: '165px',
    selectButtonMinWidth: '100px'
  },
  breakpoints: {
    small: 320,
    phone: 768,
    tablet: 1024,
    desktop: 1200,
    widescreen: 1440,
    fullhd: 1920
  },
  spacing: {
    extraSmall: 0.5,
    smallMinus: 0.75,
    small: 1,
    smallPlus: 1.019,
    medium: 1.5,
    large: 2,
    largePlus: 2.5,
    extraLarge: 3,
    extraExtraLarge: 4
  },
  mediaContextSize: {
    mqMediumStart: '560px',
    mqLargeStart: '960px',
    mqMaxWidth: '1360px'
  },
  componentBoundaries: {
    mqMediumStart: '560px',
    mqLargeStart: '960px',
    heroContentWidth: '600px',
    imageDefaultWidth: '400px',
    spacingMaxWidth: '1360px',
    headingMaxWidth: '600px',
    paragraphMaxWidth: '850px',
    marketingCalloutMinHeight: '400px',
    marketingCalloutContentWidth: '500px',
    productCardMinWidthHeight: '330px'
  },
  radius: {
    small: '2px',
    large: '4px',
    pill: '2rem',
    round: '50%'
  },
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 600
  },
  shadow: {
    insetBottom: 'inset 0 -4px 15px -7px rgba(0, 0, 0, 0.875)',
    light: '0px 0px 8px 2px rgba( 0, 0, 0, 0.2 )',
    midBottom: '0 3px 10px 0 rgba(0, 0, 0, 0.15)',
    solidLight: '0px 1px 7px 0 rgb(235, 235, 235)',
    solidDark: '0px 1px 7px 0 rgb(42, 50, 72)'
  },
  layer: {
    under: -1,
    default: 0,
    above: 1,
    nav: 10,
    overlay: 100,
    popout: 101,
    loading: 1000
  },
  color: {
    accentPrimary: 'rgb(0, 0, 0)',
    accentSecondary: 'rgb(228, 0, 43)',
    accentTertiary: 'rgb(255, 255, 255)',
    borderWhite: 'rgb(255, 255, 255)',
    borderLight: 'rgb(198, 198, 198)',
    borderDark: 'rgb(0, 0, 0)',
    canvasBlack: 'rgb(0, 0, 0)',
    canvasDark: 'rgb(127, 127, 127)',
    canvasLight: 'rgb(198, 198, 198)',
    canvasWhite: 'rgb(255, 255, 255)',
    canvasRed: 'rgb(228, 0, 43)',
    textDark: 'rgb(0, 0, 0)',
    textLight: 'rgb(127, 127, 127),',
    textWhite: 'rgb(255, 255, 255)',
    info: 'rgb(239, 239, 238)',
    success: 'rgb(65, 173, 80)',
    error: 'rgb(228, 0, 43)',
    warning: 'rgb(250, 168, 85)'
  },
  marketing: {
    marginal: {
      backgroundColor: color('textWhite'),
      backgroundOpacity: 'null',
      borderColor: 'null',
      iconColor: color('textWhite'),
      navLinkColor: color('textWhite'),
      navLinkWeight: weight('regular')
    },
    background: {
      color: color('accentPrimary')
    }
  },
  main: {
    masthead: {
      backgroundColor: color('accentSecondary'),
      mobileBackgroundColor: color('accentSecondary'),
      borderColor: color('borderLight'),
      iconColor: color('accentPrimary'),
      navLinkColor: color('textWhite'),
      navMobileLinkColor: color('textWhite'),
      navLinkWeight: weight('regular')
    },
    heading: {
      brandLoudSize: rhythm('omega'),
      brandNormalSize: rhythm('alpha'),
      brandQuietSize: rhythm('beta'),
      majorNormalSize: rhythm('delta'),
      majorQuietSize: rhythm('gamma'),
      minorNormalSize: rhythm('gamma'),
      minorQuietSize: rhythm('theta')
    },
    action: {
      ctaMain: color('accentTertiary'),
      ctaComp: color('textWhite'),
      standardMain: color('accentPrimary'),
      standardComp: color('textWhite'),
      subtleMain: color('canvasLight'),
      subtleComp: color('textDark'),
      buttonSize: rhythm('gamma'),
      buttonRadius: 0,
      default: color('accentSecondary')
    },
    form: {
      borderColor: color('borderLight'),
      activeColor: color('accentSecondary'),
      labelColor: color('textDark'),
      legendColor: color('textLight')
    },
    footer: {
      navLinkColor: color('textWhite'),
      backgroundColor: color('accentPrimary'),
      borderColor: color('accentPrimary')
    }
  },
  general: {
    accent: {
      primary: color('accentPrimary'),
      secondary: color('accentSecondary'),
      tertiary: color('accentTertiary')
    },
    border: {
      light: color('borderLight'),
      dark: color('borderDark'),
      white: color('borderWhite')
    },
    canvas: {
      black: color('canvasBlack'),
      white: color('canvasWhite'),
      dark: color('canvasDark'),
      light: color('canvasLight'),
      red: color('canvasRed')
    },
    text: {
      dark: color('textDark'),
      light: color('textLight'),
      white: color('textWhite')
    },
    system: {
      info: color('info'),
      subtleInfo: tint('rgb(239, 239, 238)', 0.93),
      success: color('success'),
      subtleSuccess: tint('rgb(65, 173, 80)', 0.93),
      error: color('error'),
      subtleError: tint('rgb(228, 0, 43)', 0.93),
      warning: color('warning'),
      subtleWarning: tint('rgb(250, 168, 85)', 0.93)
    },
    graph: {
      primary: color('accentPrimary'),
      secondary: tint('rgb(228, 0, 43)', 0.40),
      tertiary: tint('rgb(228, 0, 43)', 0.70),
      alternative: tint('rgb(228, 0, 43)', 0.90)
    }
  }
};

export default pennyTheme;
