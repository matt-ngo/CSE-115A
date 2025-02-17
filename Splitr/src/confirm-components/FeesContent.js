import React, {useContext} from 'react';
import propTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles from '../styles/ConfirmStyles';
import SharedContext from '../SharedContext';

/**
 *
 * @return {object} JSX
 */
function FeesContent({onFeesChange}) {
  const classes = useStyles();

  const {fees, isEditing} = useContext(SharedContext);

  return (
    <Table size="small" className={classes.feesContent}>
      <TableBody>
        <TableRow key="tax">
          <TableCell className={classes.noGridLine}>
            <Typography variant="body1">Tax</Typography>
          </TableCell>
          <TableCell className={classes.noGridLine} align="right">
            {isEditing ? (
              <TextField
                className={classes.priceFeeField}
                placeholder="0.00"
                value={fees.taxField}
                InputProps={{
                  classes: {
                    input: classes.priceTextField,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        value={fees.taxType}
                        onChange={(e) => onFeesChange(e, 'taxType')}
                      >
                        <MenuItem value="$">$</MenuItem>
                        <MenuItem value="%">%</MenuItem>
                      </Select>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  name: 'taxInputField',
                  inputMode: 'decimal',
                }}
                onClick={(e) => {
                  if (e.target.name == 'taxInputField') {
                    e.target.select();
                  }
                }}
                onChange={(e) => {
                  if (e.target.name == 'taxInputField') {
                    onFeesChange(e, 'taxField');
                  }
                }}
              />
            ) : (
              <Typography variant="body1">${fees.tax}</Typography>
            )}
          </TableCell>
        </TableRow>
        <TableRow key="tip">
          <TableCell className={classes.noGridLine}>
            <Typography variant="body1">Tip</Typography>
          </TableCell>
          <TableCell className={classes.noGridLine} align="right">
            {isEditing ? (
              <TextField
                className={classes.priceFeeField}
                placeholder="0.00"
                value={fees.tipField}
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
                inputProps={{
                  name: 'tipInputField',
                  inputMode: 'decimal',
                }}
                onClick={(e) => {
                  if (e.target.name == 'tipInputField') {
                    e.target.select();
                  }
                }}
                onChange={(e) => {
                  if (e.target.name == 'tipInputField') {
                    onFeesChange(e, 'tipField');
                  }
                }}
              />
            ) : (
              <Typography variant="body1">${fees.tip}</Typography>
            )}
          </TableCell>
        </TableRow>
        <TableRow key="misc">
          <TableCell className={classes.noGridLine}>
            <Typography variant="body1">Misc. Fees</Typography>
          </TableCell>
          <TableCell className={classes.noGridLine} align="right">
            {isEditing ? (
              <TextField
                className={classes.priceFeeField}
                placeholder="0.00"
                value={fees.miscField}
                InputProps={{
                  classes: {
                    input: classes.priceTextField,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        value={fees.miscType}
                        onChange={(e) => onFeesChange(e, 'miscType')}
                      >
                        <MenuItem value="$">$</MenuItem>
                        <MenuItem value="%">%</MenuItem>
                      </Select>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  name: 'miscInputField',
                  inputMode: 'decimal',
                }}
                onClick={(e) => {
                  if (e.target.name == 'miscInputField') {
                    e.target.select();
                  }
                }}
                onChange={(e) => {
                  if (e.target.name == 'miscInputField') {
                    onFeesChange(e, 'miscField');
                  }
                }}
              />
            ) : (
              <Typography variant="body1">${fees.misc}</Typography>
            )}
          </TableCell>
        </TableRow>
        <TableRow key="total">
          <TableCell className={classes.noGridLine}>
            <Typography variant="body1">Total</Typography>
          </TableCell>
          <TableCell className={classes.noGridLine} align="right">
            <Typography variant="body1">{`$${fees.total}`}</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

FeesContent.propTypes = {onFeesChange: propTypes.func};

export default FeesContent;
