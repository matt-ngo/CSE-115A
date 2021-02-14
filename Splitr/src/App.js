import React from 'react';
import AppRouter from './AppRouter';
import SharedContext from './SharedContext';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {DEFAULT_ITEMS, DEFAULT_FEES} from './DefaultValues';

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

/**
 *
 * @return {object} JSX
 */
function App() {
  // Global state of receipt items
  // NOTE: using fake data for testing, should be empty array in final!
  const [receiptItems, setReceiptItems] = React.useState(DEFAULT_ITEMS);

  // Global state of fees (taxes, tips, etc)
  // NOTE: using fake data for testing, should be empty array in final!
  const [fees, setFees] = React.useState(DEFAULT_FEES);

  // Declaration here to allow manual input option -> edit state on
  const [isEditing, setIsEditing] = React.useState(false);

  // To allow global access of calculation result
  const [splitAmount, setSplitAmount] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
      <SharedContext.Provider
        value={{
          fees,
          receiptItems,
          setFees,
          setReceiptItems,
          isEditing,
          setIsEditing,
          splitAmount,
          setSplitAmount,
        }}
      >
        <AppRouter />
      </SharedContext.Provider>
    </ThemeProvider>
  );
}

export default App;
