const COLORS = {
  primary: '#F5EBEB',
  secondary: '#E4D0D0',
  accent: '#00A8E8',

  gray: '#83829A',
  gray2: '#C1C0C8',

  white: '#F3F4F8',
  lightWhite: '#FAFAFC',

  black: '#000000',
  lightBlack: '#00000080',
};

const FONT = {
  thin: 'MThin', // 100
  extraLight: 'MExtraLight', // 200
  light: 'MLight', // 300
  regular: 'MRegular', // 400
  medium: 'MMedium', // 500
  semiBold: 'MSemiBold', // 600
  bold: 'MBold', // 700
  extraBold: 'MExtraBold', // 800
  black: 'MBlack', // 900
};

const SIZES = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

const SHADOWS = {
  small: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
