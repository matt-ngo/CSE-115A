import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Checkbox from '@material-ui/core/Checkbox';
import SharedContext from '../SharedContext';

const useStyles = makeStyles((theme) => ({
  recTable: {
    minWidth: '750',
    // width: '100%',
  },
  row: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableHeader: {
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
  collapsedRow: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  priceField: {
    width: 80,
  },
  deleteCol: {
    width: theme.spacing(6),
  },
  itemTextField: {
    fontSize: 14,
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  priceTextField: {
    fontSize: 14,
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  removeButton: {
    position: 'absolute',
    marginLeft: theme.spacing(3),
  },
  selectBox: {
    width: '50px',
    [theme.breakpoints.down('xs')]: {
      padding: 5,
      // backgroundColor: 'green',
    },
  },
  innerbox: {
    display: 'inline',
  },
  shareButtons: {
    marginTop: 5,
    marginBottom: 10,
    // display: 'flex',
    // alignItems: 'center',
  },
  cell: {
    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
}));

const calculatePriceEach = (item) => {
  return round(parseFloat(item.price) / item.shared).toFixed(2);
};

const round = (num) => {
  // using default JS round to the nearest integer
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

/**
 * Receipt Row Component
 * @param {object} props row props
 * @return {object} JSX
 */
function ReceiptRow(props) {
  const {item, idx} = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const {receiptItems, setReceiptItems, isEditing} = useContext(
      SharedContext,
  );

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

  const addShareClick = (idx) => {
    const newItems = [...receiptItems];
    newItems[idx].shared++;
    setReceiptItems(newItems);
  };

  const removeShareClick = (idx) => {
    const newItems = [...receiptItems];
    if (newItems[idx].shared - 1 > 0) {
      newItems[idx].shared--;
      setReceiptItems(newItems);
    }
  };

  if (isEditing) {
    return (
      <TableRow
        style={
          !item.isValid ? {borderStyle: 'dashed', borderColor: 'red'} : {}
        }
      >
        {/* Checkbox */}
        <TableCell className={classes.selectBox}>
          <Checkbox color="primary" onClick={() => onSelectItem(idx)} />
        </TableCell>
        {/* Input box */}
        <TableCell className={classes.cell}>
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
        </TableCell>
        {/* Price Input */}
        <TableCell align="right" className={classes.cell}>
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
        </TableCell>
        {/* Delete Icon */}
        <TableCell className={classes.cell}>
          <IconButton size="small" onClick={() => handleRemoveItemClick(idx)}>
            <HighlightOffIcon style={{color: '#e36862'}} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  } else {
    return (
      <React.Fragment>
        <TableRow
          style={
            !item.isValid ?
              {borderStyle: 'dashed', borderColor: 'red'} :
              {borderBottom: 'unset'}
          }
          className={classes.row}
        >
          {/* Checkbox */}
          <TableCell className={classes.selectBox}>
            <Checkbox color="primary" onClick={() => onSelectItem(idx)} />
          </TableCell>
          {/* Item Name */}
          <TableCell className={classes.cell}>
            <Typography variant="body1">{item.name}</Typography>
          </TableCell>
          {/* Item Price */}
          <TableCell align="right" className={classes.cell}>
            <Typography variant="body1">${item.price}</Typography>
          </TableCell>
          {/* Dropdown Arrow */}
          <TableCell align="right" className={classes.cell}>
            <IconButton size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.collapsedRow} align="center" />
          <TableCell className={classes.collapsedRow} align="center">
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box className={classes.innerbox}>
                <Typography variant="body2">
                  {`| Shared ${item.shared} way${item.shared > 1 ? 's' : ''}`}
                </Typography>
                <div className={classes.shareButtons}>
                  <IconButton
                    size="small"
                    onClick={() => removeShareClick(idx)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => addShareClick(idx)}>
                    <AddIcon />
                  </IconButton>
                </div>
              </Box>
            </Collapse>
          </TableCell>
          <TableCell
            className={classes.collapsedRow}
            align="center"
            colSpan={2}
          >
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box marginBottom={2}>
                <Typography variant="body2">
                  {`$${calculatePriceEach(item)} ea.`}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}

ReceiptRow.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    shared: PropTypes.number.isRequired,
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

/**
 * Receipt Table Component
 *
 * @return {object} JSX
 */
function ReceiptTable() {
  const classes = useStyles();
  const {receiptItems} = useContext(SharedContext);

  // const sharedDropdown = (
  //   <Collapse in={open} timeout="auto" unmountOnExit>
  //     {'test'}
  //   </Collapse>
  // );

  return (
    <Table className={classes.recTable} size="small">
      <TableHead>
        <TableRow key="header">
          <TableCell className={classes.selectBox} />
          <TableCell className={classes.tableHeader}>Item</TableCell>
          <TableCell className={classes.tableHeader} align="right">
            Price
          </TableCell>
          <TableCell align="right" />
        </TableRow>
      </TableHead>
      <TableBody>
        {receiptItems.map((item, idx) => (
          <ReceiptRow key={idx} item={item} idx={idx} />
        ))}
      </TableBody>
    </Table>
  );
}

export default ReceiptTable;
