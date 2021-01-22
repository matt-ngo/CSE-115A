import React from 'react';
import AppRouter from './AppRouter';
import SharedContext from './SharedContext';

// Temporary data for testing
const TEST_RECEIPT_ITEMS = [
  {name: 'Frozen yoghurt', price: '6.50'},
  {name: 'Ice cream sandwich', price: '4.99'},
  {name: 'Eclair', price: '10.00'},
  {name: 'Cupcake', price: '2.99'},
  {name: 'Gingerbread', price: '1.99'},
];

const TEST_FEES = {
  tax: '0.00',
  tip: '0.00',
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

  return (
    <SharedContext.Provider
      value={{
        fees,
        receiptItems,
        setFees,
        setReceiptItems,
      }}
    >
      <AppRouter/>
    </SharedContext.Provider>
  );
}

export default App;
