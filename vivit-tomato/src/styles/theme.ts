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
      large: 16,
      xlarge: 19,
      xxlarge: 24,
      xxxlarge: 36
    }
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
