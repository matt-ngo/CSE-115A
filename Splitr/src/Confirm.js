import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
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
    maxWidth: '400px',
    margin: 'auto',
  },
  brandHeader: {
    textAlign: 'center',
  },
  paper: {
    width: 'auto',
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
  addButton: {
    margin: theme.spacing(2, 0),
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
  editIconButton: {
    marginLeft: 'auto',
  },
  removeButton: {
    position: 'absolute',
    marginLeft: theme.spacing(3),
  },
}));

const calculateTotal = (items, fees) => {
  let total = 0;
  items.forEach((item) => {
    if (item.isSelected) {
      total += parseFloat(item.price);
    }
  });
  total += parseFloat(fees.tax) + parseFloat(fees.tip);
  if (!total) return 0;
  return total.toFixed(2);
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
  } = useContext(SharedContext);

  const onNameChange = (event, idx) => {
    const newItems = [...receiptItems];
    newItems[idx].name = event.target.value;
    setReceiptItems(newItems);
  };

  const onPriceChange = (event, idx) => {
    const isNum = /^\d*\.*\d{0,2}$/.test(event.target.value);
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
      const newItems = receiptItems.filter((item) =>
        (item.name != '')).map((item)=>{
        let isValid = true;
        // Format price
        let newPrice = item.price;
        if (/^.$/) {
          newPrice = `${newPrice}00`;
        }
        if (item.price == '') {
          canSave = false;
          isValid = false;
        }
        return {...item, isValid, price: newPrice};
      });
      setReceiptItems(newItems);
      if (canSave) {
        setIsEditing(false);
      }
    }
    setIsEditing(true);
  };

  const receiptContent = (
    <TableBody>
      {receiptItems.map((item, idx) => (
        <TableRow key={idx}
          style={!item.isValid ?
            {borderStyle: 'dashed',
              borderColor: 'red'}:
              {}
          }
        >
          <TableCell>
            {
              (
                <Checkbox color="primary"
                  onClick={()=>onSelectItem(idx)}></Checkbox>
              )
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
            ) : item.name}
          </TableCell>
          <TableCell align="right">
            {isEditing ? (
            <div>
              <TextField
                className={classes.priceField}
                placeholder="0.00"
                value={item.price}
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
                <HighlightOffIcon/>
              </IconButton>
            </div>
            ) : `$${item.price}`}
          </TableCell>
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
              className={classes.priceField}
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
          ) : `$${fees.tax}`}
        </TableCell>
      </TableRow>
      <TableRow key="tip">
        <TableCell className={classes.noGridLine}>Tip</TableCell>
        <TableCell className={classes.noGridLine} align="right">
          {isEditing ? (
            <TextField
              className={classes.priceField}
              value={fees.tip}
              InputProps={{
                classes: {
                  input: classes.priceTextField,
                },
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              onChange={(e) => onFeesChange(e, 'tip')}
            />
            ) : `$${fees.tip}`}
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

  return (
    <div className={classes.root}>
      <CssBaseline/>
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
            {isEditing ? <SaveIcon/> : <EditIcon />}
          </IconButton>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow key="header">
              <TableCell className={classes.tableHeader}>Item</TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          {receiptContent}
        </Table>
      </Paper>
      {isEditing ? (
        <Button
          className={classes.addButton}
          variant="contained"
          color="primary"
          onClick={handleAddItemClick}
        >
          Add Item +
        </Button>
      ) : <div/>}
      <Paper className={classes.paper}>
        <Table size="small">
          {feesContent}
        </Table>
      </Paper>
    </div>
  );
}

export default Confirm;
