import React from 'react';
import AppRouter from './AppRouter';
import SharedContext from './SharedContext';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';

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
    fontFamily: ['Fira Code', 'monospace'].join(','),
  },
});

// Temporary data for testing
const TEST_RECEIPT_ITEMS = [
  {name: 'Frozen yoghurt', price: '6.50', isSelected: false, isValid: true},
  {
    name: 'Ice cream sandwich',
    price: '4.99',
    isSelected: false,
    isValid: true,
  },
  {name: 'Eclair', price: '10.00', isSelected: false, isValid: true},
  {name: 'Cupcake', price: '2.99', isSelected: false, isValid: true},
  {name: 'Gingerbread', price: '1.99', isSelected: false, isValid: true},
];

const TEST_FEES = {
  tax: '0.00',
  tip: '0.00',
  misc: '0.00',
};

/**
 *
 * @return {object} JSX
 */
function App() {
  // Global state of receipt items, initialized to test data
  const [receiptItems, setReceiptItems] = React.useState(TEST_RECEIPT_ITEMS);

  // Global state of fees (taxes, tips, etc) initialized to test data
  const [fees, setFees] = React.useState(TEST_FEES);

  // Declaration here to allow manual input option -> edit state on
  const [isEditing, setIsEditing] = React.useState(false);

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
        }}
      >
        <AppRouter />
      </SharedContext.Provider>
    </ThemeProvider>
  );
}

export default App;
