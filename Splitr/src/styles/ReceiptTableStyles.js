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
    paddingLeft: 5,
    paddingRight: 2,
    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
  collapsedRow: {
    paddingBottom: 0,
    paddingTop: 0,
    padding: 0,
  },
  sharedBox: {
    paddingLeft: '40%',
    paddingTop: '5%',
  },
  sharedPriceBox: {
    paddingLeft: '20%',
    paddingTop: '10%',
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
  iconCell: {
    width: '70px',
    paddingRight: '0',
    paddingLeft: '0',
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
  },
  button: {
    color: '#074EE8',
    paddingLeft: '15px',
    // [theme.breakpoints.down('xs')]: {

    // },
  },
  cell: {
    borderBottom: 'none !important',
    paddingLeft: 5,
    paddingRight: 2,
    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
  deleteIcon: {
    color: '#e36862',
    // paddingLeft: '16px',
  },
}));

export default useStyles;
