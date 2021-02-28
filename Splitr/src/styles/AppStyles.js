import {createMuiTheme} from '@material-ui/core/styles';

// custom css: https://material-ui.com/customization/theming/
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f8f5f2',
    },
    text: {
      primary: '#232323',
    },
    primary: {
      main: '#074EE8',
    },
    secondary: {
      main: '#e16162',
    },
  },
  typography: {
    fontFamily: ['Fira Code Medium', 'monospace'].join(','),
    fontSize: 14,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: 'none',
      },
    },
  },
});

theme.typography.body1 = {
  fontFamily: ['Fira Code Medium', 'monospace'].join(','),
  fontSize: 14,
  [theme.breakpoints.down('xs')]: {
    fontSize: 12,
  },
};

theme.typography.body2 = {
  fontFamily: ['Fira Code Medium', 'monospace'].join(','),
  fontSize: 12,
  [theme.breakpoints.down('xs')]: {
    fontSize: 11,
  },
};

theme.typography.h6 = {
  fontFamily: ['Fira Code Medium', 'monospace'].join(','),
  fontSize: 22,
  fontWeight: 600,
  [theme.breakpoints.down('xs')]: {
    fontSize: 18,
  },
};

export default theme;
