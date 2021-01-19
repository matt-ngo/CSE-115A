import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
}));

const data = [
  {item: 'Frozen yoghurt', price: '6.50'},
  {item: 'Ice cream sandwich', price: '4.99'},
  {item: 'Eclair', price: '10.00'},
  {item: 'Cupcake', price: '2.99'},
  {item: 'Gingerbread', price: '1.99'},
];

const fees = [
  {type: 'Tax', price: '0.00'},
  {type: 'Tip', price: '0.00'},
  {type: 'Total', price: '0.00'},
];

/**
 * Confirm Page Component
 *
 * @return {object} JSX
 */
function Confirm() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Container className={classes.brandHeader} maxWidth="md">
        <h1>SPLITR</h1>
      </Container>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Item</TableCell>
              <TableCell className={classes.tableHeader} align="right">
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data) => (
              <TableRow key={data.item}>
                <TableCell>{data.item}</TableCell>
                <TableCell align="right">{data.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Button
        className={classes.addButton}
        variant="contained"
        color="secondary"
      >
        Add Item +
      </Button>
      <Paper className={classes.paper}>
        <Table size="small">
          <TableBody>
            {fees.map((fees) => (
              <TableRow key={fees.type}>
                <TableCell className={classes.noGridLine}>
                  {fees.type}
                </TableCell>
                <TableCell className={classes.noGridLine} align="right">
                  {fees.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default Confirm;
