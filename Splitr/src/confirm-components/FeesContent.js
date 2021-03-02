import React, {useContext} from 'react';
import propTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {Table, TableBody, TableCell, TableRow} from '@material-ui/core';
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
                type="number"
                inputProps={{inputMode: 'decimal'}}
                placeholder="0.00"
                value={fees.tax}
                InputProps={{
                  classes: {
                    input: classes.priceTextField,
                  },
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onClick={(e) => e.target.select()}
                onChange={(e) => onFeesChange(e, 'tax')}
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
                className={classes.priceTipField}
                type="number"
                placeholder="0.00"
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
                inputProps={{
                  name: 'tipPriceInput',
                  inputMode: 'decimal',
                }}
                onClick={(e) => {
                  if (e.target.name == 'tipPriceInput') {
                    e.target.select();
                  }
                }}
                onChange={(e) => onFeesChange(e, 'tip')}
              />
            ) : fees.tipType == '%' ? (
              <Typography variant="body1">{fees.tip}%</Typography>
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
                type="number"
                inputProps={{inputMode: 'decimal'}}
                placeholder="0.00"
                value={fees.misc}
                InputProps={{
                  classes: {
                    input: classes.priceTextField,
                  },
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                onClick={(e) => e.target.select()}
                onChange={(e) => onFeesChange(e, 'misc')}
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
