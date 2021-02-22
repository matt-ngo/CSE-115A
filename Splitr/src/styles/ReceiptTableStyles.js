import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  recTable: {
    minWidth: '750',
  },
  row: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  rowWrappable: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
  noGridLine: {
    borderBottom: 'none',
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
  button: {
    // marginLeft: '20%',
    // marginRight: '2%',
  },
  cell: {
    borderBottom: 'none !important',
    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
    width: '50px',
  },
}));

export default useStyles;
