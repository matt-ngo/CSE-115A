import {createMuiTheme} from '@material-ui/core/styles';

// custom css: https://material-ui.com/customization/theming/
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f0efe7',
    },
    text: {
      primary: '#1c1b1b',
    },
    primary: {
      main: '#074EE8',
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
  fontSize: 14,
  [theme.breakpoints.down('xs')]: {
    fontSize: 12,
  },
};

export default theme;
