import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    maxWidth: '450px',
    margin: 'auto',
    padding: '20px',
  },
  brandHeader: {
    textAlign: 'left',
    color: '#074EE8',
  },
  paper: {
    width: 'auto',
    boxShadow: '7px 8px 15px grey',
    marginBottom: '1rem',
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
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  priceFeeField: {
    width: 100,
  },
  priceTipField: {
    width: 106,
  },
  editIconButton: {
    marginLeft: 'auto',
    color: '#074EE8',
  },
  nextButton: {
    margin: '1rem auto',
  },
  totalFooter: {
    paddingTop: '15px',
    paddingBottom: '20px',
  },
  dotted: {
    margin: 'auto',
    marginTop: '5%',
    marginBottom: '5%',
    width: '90%',
    borderTop: '#1c1b1b 2px dashed',
  },
}));

export default useStyles;
