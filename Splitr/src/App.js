import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './styles/AppStyles';
import AppRouter from './AppRouter';
import {DEFAULT_ITEMS, DEFAULT_FEES} from './DefaultValues';
import SharedContext from './SharedContext';

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
