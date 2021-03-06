import React, {useEffect, useContext, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import ShareIcon from '@material-ui/icons/Share';
import SharedContext from './SharedContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FeesContent from './confirm-components/FeesContent';
import ReceiptTable from './confirm-components/ReceiptTable';
import ShareModal from './confirm-components/ShareModal';
import useStyles from './styles/ConfirmStyles';
import queryString from 'query-string';
import {DEFAULT_ITEM, DEFAULT_ITEMS, DEFAULT_FEES} from './DefaultValues';

export const isValidPrice = (stringToTest) => {
  return /^\d*\.{0,1}\d{0,2}$/.test(stringToTest);
};

const calculateTip = (subtotal, tipValue, tipType) => {
  if (tipType == '%') {
    return (tipValue / 100.0) * subtotal;
  } else {
    return tipValue;
  }
};

const getQueryStringParameters = () => {
  const query = window.location.search;
  if (!query) {
    return null;
  }
  return queryString.parse(query);
};

const generateItemsArrayFromQueryStringData = (queries) => {
  const newItems = [];
  let i = 0;
  while (true) {
    const item = queries[`item${i}`];
    const price = queries[`price${i}`];
    const shared = queries[`shared${i}`];

    if (item && price && shared) {
      const newItem = {
        ...DEFAULT_ITEM,
        name: item,
        price,
        shared: parseInt(shared),
      };
      newItems.push(newItem);
      i++;
    } else {
      break;
    }
  }
  return newItems;
};

const getItemsFromQueryString = () => {
  const queries = getQueryStringParameters();
  if (!queries) {
    return null;
  }

  const newItems = generateItemsArrayFromQueryStringData(queries);
  if (newItems.length === 0) {
    return null;
  }

  return newItems;
};

const getFeesFromQueryString = () => {
  const queries = getQueryStringParameters();
  if (!queries) {
    return null;
  }

  const tax = queries['tax'];
  const tip = queries['tip'];
  const tipType = queries['tip_type'];
  const misc = queries['misc_fees'];

  if (tax && tip && tipType && misc) {
    return {...DEFAULT_FEES, tax, tip, tipType, misc};
  }
  return null;
};

// Makes NaN values calculable for totals
// Useful for user responsiveness on price changes
const getValidPriceForTotal = (price) => {
  return price && price !== '.' ? price : '0';
};

const calculateTotal = (items, fees) => {
  let total = 0;
  items.forEach((item) => {
    const price = getValidPriceForTotal(item.price);
    total += parseFloat(price);
  });
  const tip = getValidPriceForTotal(fees.tip);
  const tax = getValidPriceForTotal(fees.tax);
  const misc = getValidPriceForTotal(fees.misc);

  total += calculateTip(total, parseFloat(tip), fees.tipType);
  total += parseFloat(tax) + parseFloat(misc);

  return total.toFixed(2);
};

const round = (num) => {
  // using default JS round to the nearest integer
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

/**
 * Confirm Page Component
 *
 * @return {object} JSX
 */
function Confirm() {
  const classes = useStyles();
  const history = useHistory();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const {
    fees,
    receiptItems,
    setFees,
    setReceiptItems,
    isEditing,
    setIsEditing,
    setSplitAmount,
    splitAmount,
  } = useContext(SharedContext);

  // Format prices (OCR input)
  useEffect(() => {
    formatItemPricesAndReturnSafeToSave();
  }, []);

  // Populates field with data based on query string
  useEffect(() => {
    setReceiptItems((prev) => {
      const newItems = getItemsFromQueryString();
      if (newItems) {
        return newItems;
      }
      return prev;
    });

    setFees((prev) => {
      const newFees = getFeesFromQueryString();
      if (newFees) {
        return newFees;
      }
      return prev;
    });
  }, []);

  // Updates totals when items are edited
  useEffect(() => {
    setFees((prev) => {
      const newTotal = calculateTotal(receiptItems, fees);
      if (isNaN(newTotal)) {
        return prev;
      }
      return {...prev, total: newTotal};
    });

    setSplitAmount((prev) => {
      const newSplitAmount = calculateSplit(receiptItems, fees);

      if (!isNaN(newSplitAmount) && newSplitAmount !== prev) {
        return newSplitAmount;
      }
      return prev;
    });
  }, [receiptItems]);

  const calculateSplit = (items, fees) => {
    let selected = 0;
    let total = 0;
    items.forEach((item) => {
      if (item.isSelected) {
        selected += round(
            parseFloat(getValidPriceForTotal(item.price)) / item.shared,
        );
      }
      total += parseFloat(item.price);
    });

    const percentage = total === 0 ? 0 : selected / total;
    // calc and add fraction of tax and tip
    selected += round(percentage * parseFloat(fees.tax).toFixed(2));
    selected += round(
        percentage *
        calculateTip(total, parseFloat(fees.tip), fees.tipType).toFixed(2),
    );
    selected += round(percentage * parseFloat(fees.misc).toFixed(2));

    return round(selected);
  };

  const onFeesChange = (event, key) => {
    const newFees = {...fees};
    if (key !== 'tipType' && !isValidPrice(event.target.value)) {
      return;
    }
    newFees[key] = event.target.value;

    const newTotal = calculateTotal(receiptItems, newFees);
    if (!isNaN(newTotal)) {
      newFees.total = newTotal;
    }
    setFees(newFees);
  };

  const handleAddItemClick = () => {
    setReceiptItems([...receiptItems, {...DEFAULT_ITEM}]);
  };

  const handleDeleteAllClick = () => {
    setReceiptItems([]);
  };

  const formatPrice = (price) => {
    let newPrice = price === '.' ? '' : price;
    if (newPrice) {
      newPrice = parseFloat(price);
      newPrice = newPrice.toFixed(2);
    }
    return newPrice;
  };

  const formatItemPricesAndReturnSafeToSave = () => {
    let canSave = true;
    const newItems = receiptItems
        .filter((item) => item.name != '')
        .map((item) => {
          let isValid = true;

          // Format receipt prices upon save
          const newPrice = formatPrice(item.price);

          if (newPrice == '') {
            canSave = false;
            isValid = false;
          }
          return {...item, isValid, price: newPrice};
        });
    setReceiptItems(newItems);
    return canSave;
  };

  const formatFeesOnSave = () => {
    // Format values of tax, tip, misc fees
    setFees(() => {
      const newTax = formatPrice(getValidPriceForTotal(fees.tax));
      const newTip = formatPrice(getValidPriceForTotal(fees.tip));
      const newMisc = formatPrice(getValidPriceForTotal(fees.misc));
      return {...fees, tax: newTax, tip: newTip, misc: newMisc};
    });
  };

  const onToggleEdit = () => {
    let canSave = true;
    if (isEditing) {
      canSave = formatItemPricesAndReturnSafeToSave();
      formatFeesOnSave();

      if (canSave) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const onBackButtonClick = () => {
    // Reset saved data
    setReceiptItems(DEFAULT_ITEMS);
    setFees(DEFAULT_FEES);
    setIsEditing(false);
    setSplitAmount(0);

    // Go back to home page
    history.push('/');
  };

  const splitContent = (
    <TableBody>
      <TableRow>
        <TableCell className={classes.noGridLine} align="center">
          <Typography variant="h6">Your Split:</Typography>
          <Typography variant="h6" style={{paddingTop: '3%'}}>
            {`$${splitAmount.toFixed(2)}`}
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Toolbar className={classes.brandHeader}>
        <IconButton
          className={classes.backIconButton}
          edge="start"
          onClick={onBackButtonClick}
        >
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h1" className={classes.h1}>
          SPLITR
        </Typography>
        {!isEditing && (
          <IconButton
            className={classes.shareIconButton}
            edge="end"
            onClick={() => setIsShareModalOpen(true)}
          >
            <ShareIcon />
          </IconButton>
        )}
      </Toolbar>

      <Paper className={classes.paper}>
        <Toolbar>
          <Typography variant="h6">
            {isEditing ? 'Edit Receipt' : 'Select Items'}
          </Typography>
          <IconButton
            className={classes.editIconButton}
            edge="end"
            onClick={onToggleEdit}
          >
            {isEditing ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Toolbar>

        <ReceiptTable />

        {isEditing ? (
          <Table>
            <TableBody>
              <TableRow className={classes.buttonRow}>
                <TableCell align="center">
                  <Button
                    className={classes.addButton}
                    variant="contained"
                    color="primary"
                    onClick={handleAddItemClick}
                  >
                    Add Item +
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    className={classes.deleteAllButton}
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteAllClick}
                  >
                    Delete All
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <div />
        )}

        <div className={classes.dotted}></div>

        <div className={classes.totalFooter}>
          <FeesContent onFeesChange={onFeesChange} />

          {isEditing ? null : <Table>{splitContent}</Table>}

          {!isEditing && (
            <div style={{display: 'flex'}}>
              <Button
                className={classes.nextButton}
                color="primary"
                variant="contained"
                component={Link}
                to="/pay"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </Paper>
      {isShareModalOpen && (
        <ShareModal setIsShareModalOpen={setIsShareModalOpen} />
      )}
    </div>
  );
}

export default Confirm;
