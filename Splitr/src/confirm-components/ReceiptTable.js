import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles/ReceiptTableStyles';
import SharedContext from '../SharedContext';
import {isValidPrice} from '../Confirm';

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
    if (!isValidPrice(event.target.value)) {
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
    newItems[idx].isSelected = true;
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
      <TableRow className={!item.isValid ? classes.invalidItemBoxOutline : {}}>
        {/* Checkbox */}
        <TableCell className={classes.selectBox}>
          {isEditing ? null : (
            <Checkbox
              color="primary"
              checked={item.isSelected}
              onClick={() => onSelectItem(idx)}
            />
          )}
        </TableCell>
        {/* Input box */}
        <TableCell className={classes.cell}>
          <TextField
            placeholder="eg. Cupcakes"
            value={item.name.toUpperCase()}
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
            // type="number"
            inputProps={{inputMode: 'decimal'}}
            value={item.price}
            error={!item.isValid}
            helperText={item.isValid ? '' : 'Required'}
            InputProps={{
              classes: {
                input: classes.priceTextField,
              },
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onClick={(e) => e.target.select()}
            onChange={(e) => onPriceChange(e, idx)}
          />
        </TableCell>
        {/* Delete Icon */}
        <TableCell className={classes.iconCell} align="center">
          <IconButton size="small" onClick={() => handleRemoveItemClick(idx)}>
            <HighlightOffIcon className={classes.deleteIcon} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  } else {
    return (
      <React.Fragment>
        <TableRow className={(classes.row, classes.rowWrappable)}>
          {/* Checkbox */}
          <TableCell className={classes.iconCell} align="center">
            <Checkbox
              color="primary"
              checked={item.isSelected}
              onClick={() => onSelectItem(idx)}
            />
          </TableCell>
          {/* Item Name */}
          <TableCell className={classes.cell}>
            <Typography variant="body1" style={{maxWidth: '130px'}}>
              {item.name.toUpperCase()}
            </Typography>
          </TableCell>
          {/* Item Price */}
          <TableCell
            align="right"
            className={classes.cell}
            style={{maxWidth: '90px'}}
          >
            <Typography variant="body1">${item.price}</Typography>
          </TableCell>
          {/* Dropdown Arrow */}
          <TableCell align="right" className={classes.iconCell}>
            <IconButton size="small" onClick={() => setExpanded(!expanded)}>
              {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow className={classes.rowWrappable}>
          {/* <TableCell className={classes.collapsedRow} align="center" /> */}
          <TableCell
            className={classes.collapsedRow}
            align="center"
            colSpan={2}
          >
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box className={classes.sharedBox}>
                <Typography variant="body2">
                  {`→ Shared ${item.shared} way${item.shared > 1 ? 's' : ''}`}
                </Typography>
                <div className={classes.shareButtons}>
                  <IconButton
                    size="small"
                    className={classes.button}
                    onClick={() => removeShareClick(idx)}
                  >
                    <RemoveCircleRoundedIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    className={classes.button}
                    onClick={() => addShareClick(idx)}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                </div>
              </Box>
            </Collapse>
          </TableCell>
          <TableCell className={classes.collapsedRow} align="right" colSpan={2}>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box
                marginBottom={2}
                style={{maxWidth: '120px'}}
                className={classes.sharedPriceBox}
              >
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
