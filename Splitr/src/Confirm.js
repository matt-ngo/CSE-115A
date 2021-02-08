import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Checkbox from '@material-ui/core/Checkbox';
import SharedContext from './SharedContext';
import {DEFAULT_ITEM} from './DefaultValues';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    maxWidth: '450px',
    margin: 'auto',
    padding: '20px',
  },
  brandHeader: {
    textAlign: 'center',
  },
  paper: {
    width: 'auto',
    boxShadow: '7px 8px 15px grey',
  },
  itemsTable: {
    marginBottom: theme.spacing(2),
  },
  noGridLine: {
    borderBottom: 'none',
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  deleteCol: {
    width: theme.spacing(6),
  },
  addButton: {
    margin: theme.spacing(3, 3),
  },
  priceField: {
    width: 80,
  },
  itemTextField: {
    fontSize: 14,
  },
  priceTextField: {
    fontSize: 14,
    textAlign: 'right',
  },
  priceFeeField: {
    width: 100,
  },
  priceTipField: {
    width: 106,
  },
  editIconButton: {
    marginLeft: 'auto',
  },
  removeButton: {
    position: 'absolute',
    marginLeft: theme.spacing(3),
  },
  nextButton: {
    margin: '1rem auto',
  },
  selectBox: {
    width: '50px',
  },
  totalFooter: {
    paddingTop: '15px',
    paddingBottom: '20px',
  },
}));

const calculateTip = (subtotal, tipValue, tipType) => {
  if (tipType == '%') {
    return tipValue / 100.0 * subtotal;
  } else {
    return tipValue;
  }
};

const calculateTotal = (items, fees) => {
  let total = 0;
  items.forEach((item) => {
    // if (item.isSelected) {
    total += parseFloat(item.price);
    // }
  });
  total += calculateTip(total, parseFloat(fees.tip), fees.tipType);
  total += parseFloat(fees.tax) + parseFloat(fees.misc);
  if (!total) return 0;
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

  const {
    fees,
    receiptItems,
    setFees,
    setReceiptItems,
    isEditing,
    setIsEditing,
    setSplitAmount,
  } = useContext(SharedContext);

  const calculateSplit = (items, fees) => {
    let selected = 0;
    let total = 0;
    items.forEach((item) => {
      if (item.isSelected) {
        selected += round(parseFloat(item.price) / item.shared);
      }
      total += parseFloat(item.price);
    });
    const percentage = selected/total;
    // calc and add fraction of tax and tip
    selected += round(percentage * parseFloat(fees.tax).toFixed(2));
    selected += round(percentage * parseFloat(fees.tip).toFixed(2));
    selected += round(percentage * parseFloat(fees.misc).toFixed(2));

    setSplitAmount(round(selected));

    return round(selected);
  };

  const onNameChange = (event, idx) => {
    const newItems = [...receiptItems];
    newItems[idx].name = event.target.value;
    setReceiptItems(newItems);
  };

  const onPriceChange = (event, idx) => {
    const isNum = /^\d*\.{0,1}\d{0,2}$/.test(event.target.value);
    if (!isNum) {
      return;
    }
    const newItems = [...receiptItems];
    newItems[idx].price = event.target.value;
    setReceiptItems(newItems);
  };

  const onFeesChange = (event, key) => {
    const newFees = {...fees};
    newFees[key] = event.target.value;
    newFees.total = calculateTotal(receiptItems, newFees);
    setFees(newFees);
  };

  const handleAddItemClick = () => {
    setReceiptItems([...receiptItems, {...DEFAULT_ITEM}]);
  };

  const handleRemoveItemClick = (idx) => {
    const newItems = [...receiptItems];
    newItems.splice(idx, 1);
    setReceiptItems(newItems);
  };

  const onSelectItem = (idx) => {
    const newItems = [...receiptItems];
    newItems[idx].isSelected = !newItems[idx].isSelected;
    setReceiptItems(newItems);
  };

  const onToggleEdit = () => {
    let canSave = true;
    if (isEditing) {
      const newItems = receiptItems
          .filter((item) => item.name != '')
          .map((item) => {
            let isValid = true;

            // Format prices upon save
            let newPrice = item.price === '.' ? '' : item.price;
            if (newPrice) {
              newPrice = parseFloat(item.price);
              newPrice = newPrice.toFixed(2);
            }

            if (newPrice == '') {
              canSave = false;
              isValid = false;
            }
            return {...item, isValid, price: newPrice};
          });
      setReceiptItems(newItems);
      if (canSave) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const receiptContent = (
    <TableBody>
      {receiptItems.map((item, idx) => (
        <TableRow
          key={idx}
          style={
            !item.isValid ? {borderStyle: 'dashed', borderColor: 'red'} : {}
          }
        >
          <TableCell className={classes.selectBox}>
            {
              <Checkbox
                color="primary"
                onClick={() => onSelectItem(idx)}
              ></Checkbox>
            }
          </TableCell>
          <TableCell>
            {isEditing ? (
              <TextField
                placeholder="eg. Cupcakes"
                value={item.name}
                InputProps={{
                  classes: {
                    input: classes.itemTextField,
                  },
                }}
                onChange={(e) => onNameChange(e, idx)}
              />
            ) : (
              item.name
            )}
          </TableCell>
          <TableCell align="right">
            {isEditing ? (
              <div>
                <TextField
                  className={classes.priceField}
                  placeholder="0.00"
                  value={item.price}
                  error={!item.isValid}
                  id="standard-error"
                  helperText={item.isValid ? '' : 'Price is required'}
                  InputProps={{
                    classes: {
                      input: classes.priceTextField,
                    },
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  onChange={(e) => onPriceChange(e, idx)}
                />

                <IconButton
                  className={classes.removeButton}
                  size="small"
                  onClick={() => handleRemoveItemClick(idx)}
                >
                  <HighlightOffIcon style={{fill: '#d01b1b'}}/>
                </IconButton>

              </div>
            ) : (
              `$${item.price}`
            )}

          </TableCell>

          {/* empty cell for delete icon */}
          {isEditing ? (<TableCell align="right"></TableCell>) : null}

        </TableRow>
      ))}
    </TableBody>
  );

  const feesContent = (
    <TableBody>
      <TableRow key="tax">
        <TableCell className={classes.noGridLine}>Tax</TableCell>
        <TableCell className={classes.noGridLine} align="right">
          {isEditing ? (
            <TextField
              className={classes.priceFeeField}
              value={fees.tax}
              InputProps={{
                classes: {
                  input: classes.priceTextField,
                },
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={(e) => onFeesChange(e, 'tax')}
            />
          ) : (
            `$${fees.tax}`
          )}
        </TableCell>
      </TableRow>
      <TableRow key="tip">
        <TableCell className={classes.noGridLine}>Tip</TableCell>
        <TableCell className={classes.noGridLine} align="right">
          {isEditing ? (
            <TextField
              className={classes.priceTipField}
              value={fees.tip}
              InputProps={{
                classes: {
                  input: classes.priceTextField,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Select
                      value={fees.tipType}
                      onChange={(e) => onFeesChange(e, 'tipType')}
                    >
                      <MenuItem value="$">$</MenuItem>
                      <MenuItem value="%">%</MenuItem>
                    </Select>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => onFeesChange(e, 'tip')}
            />
          ) : (
            (fees.tipType == '%') ? (`${fees.tip}%`) : (`$${fees.tip}`)
          )}
        </TableCell>
      </TableRow>
      <TableRow key="misc">
        <TableCell className={classes.noGridLine}>Misc. Fees</TableCell>
        <TableCell className={classes.noGridLine} align="right">
          {isEditing ? (
            <TextField
              className={classes.priceFeeField}
              value={fees.misc}
              InputProps={{
                classes: {
                  input: classes.priceTextField,
                },
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={(e) => onFeesChange(e, 'misc')}
            />
          ) : (
            `$${fees.misc}`
          )}
        </TableCell>
      </TableRow>
      <TableRow key="total">
        <TableCell className={classes.noGridLine}>Total</TableCell>
        <TableCell className={classes.noGridLine} align="right">
          {`$${calculateTotal(receiptItems, fees)}`}
        </TableCell>
      </TableRow>
    </TableBody>
  );

  const splitContent = (
    <TableBody>
      <TableRow>
        <TableCell className={classes.noGridLine} align="center">
          <Typography variant="h6">
            Your Split:
          </Typography>
          <Typography variant="h5">
            <div>
              {`$${calculateSplit(receiptItems, fees)}`}
            </div>
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.brandHeader} maxWidth="md">
        <h1>SPLITR</h1>
      </Container>
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
        <Table>
          <TableHead>
            <TableRow key="header">
              <TableCell className={classes.tableHeader}>Item</TableCell>
              <TableCell></TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Price
              </TableCell>
              {isEditing ?
                <TableCell className={classes.deleteCol}></TableCell> : null}
            </TableRow>
          </TableHead>
          {receiptContent}
        </Table>

        {isEditing ? (
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={handleAddItemClick}
        >
          Add Item +
        </Button>
      ) : (<div/>)}

        <div className={classes.totalFooter}>
          <Table size="small">
            {feesContent}
          </Table>

          <Table>
            {splitContent}
          </Table>

          {!isEditing && (
            <div style={{display: 'flex'}}>
              <Button
                className={classes.nextButton}
                color="primary"
                variant="contained"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </Paper>

    </div>
  );
}

export default Confirm;
