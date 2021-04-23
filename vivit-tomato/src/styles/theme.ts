export default {
  border: {
    radius: '10px'
  },
  font: {
    family: {
      ubuntu_bold: 'Ubuntu-Bold',
      ubuntu_bold_italic: 'Ubuntu-Light',
      ubuntu_light: 'Ubuntu-Light',
      ubuntu_medium: 'Ubuntu-Medium'
    },
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xsmall: 10,
      small: 12,
      medium: 14,
      large: 19,
      xlarge: 22,
      xxlarge: 25,
      xxxlarge: 36
    }
  },
  theme_colors: {
    primary: '#f56161',
    secondary: '#2A9D8F',
    yellow1: '#FFF3B0',
    yellow2: '#E9C46A',
    orange: '#F4A261',
    tomato: '#E76F51',
    white: '#FAFAFA'
  },
  colors: {
    mediumChampagne: '#FFF3B0',
    orange: '#f56161',
    charcoal: '#264653',
    PersioanGreen: '#2A9D8F',
    orangeYellowCrayola: '#E9C46A',
    sandyBrown: '#F4A261',
    BurntSienna: '#E76F51',
    white: '#FAFAFA',
    lightGray: '#CECECE',
    gray: '#8F8F8F',
    darkGray: '#2E2F42',
    black: '#030517'
  },
  spacings: {
    xxsmall: '9px',
    xsmall: '10px',
    small: '12px',
    medium: '15px',
    large: '18px',
    xlarge: '20px',
    xxlarge: '22px'
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50
  }
} as const
