export const colors = {
  // Primary Palette
  primary: {
    accuBlue: '#4680BF',
    accuOrange: '#F7AC4E',
  },

  // Grays
  gray: {
    white: '#FFFFFF',
    gray0: '#FAFAFA',
    gray1: '#EFEFEF',
    gray2: '#DCDCDC',
    gray3: '#CCCCCC',
    gray4: '#9D9D9D',
    gray5: '#777777',
    gray6: '#4D4D4D',
    black: '#000000',
    background: '#F8F8F8',
  },

  // Secondary
  secondary: {
    yellow: '#F4C200',
    red: '#E54A48',
    green: '#8BC541',
    darkGreen: '#789A4D',
    purple: '#AB55A0',
    cyan: '#17A9E1',
    grayBlue: '#3D6380',
    gold: '#FAAE42',
    searchHighlight: '#FFFF00',
    accuBlueDark: '#24476C',
  },

  // Light Tints
  light: {
    red: '#FFE3E3',
    blue: '#EBF4FF',
    cyan: '#D6EEF8',
    green: '#ECF7DC',
    purple: '#F2E2F0',
    orange: '#FFEEE3',
  },

  // Logo Colors
  logo: {
    orange: '#F4925D',
    blue: '#1E4A6C',
    gray: '#929497',
  },

  // Button State Colors
  button: {
    primaryHover: '#6293C9',
    primaryDisabled: '#C7D9EC',
    warningHover: '#F6A87D',
    warningDisabled: '#FCDECE',
    successHover: '#B3E16F',
    successDisabled: '#DCEEC6',
    errorHover: '#F98482',
    errorDisabled: '#F7C9C8',
    menuBlue: '#DAEAFB',
    menuHover: '#E1EEFC',
  },

  // Form Colors
  form: {
    inputBackground: '#F8F8F8',
    inputText: '#313131',
    focusShadow: '#007BFF',
  },

  // Disabled States
  disabled: {
    orange: '#F6A87D',
  },
} as const

export type ColorToken = typeof colors
