import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    maxWidth: '450px',
    margin: 'auto',
    padding: '20px',
  },
  brandHeader: {
    color: '#074EE8',
    padding: '20px',
    paddingLeft: '0',
  },
  h1: {
    fontFamily: '"Pacifico", sans-serif',
    textTransform: 'lowercase',
    fontSize: '40px',
    flexGrow: 1,
  },
  paper: {
    width: 'auto',
    // boxShadow: '0px 10px 20px grey',
    marginBottom: '1rem',
    boxShadow: '9px 9px 0px grey',
    border: '5px solid #232323',
    borderRadius: '10px',
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
  buttonRow: {
    width: '100%',
  },
  addButton: {
    margin: 'auto',
  },
  deleteAllButton: {
    margin: 'auto',
    // margin: theme.spacing(1, 3),
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
    width: 110,
  },
  backIconButton: {
    marginRight: theme.spacing(3),
    color: '#232323',
    // color: '#074EE8',
    transform: 'scale(1.2)',
  },
  shareIconButton: {
    // marginRight: '24px',
    color: '#232323',
    // transform: 'scale(1.2)',
  },
  editIconButton: {
    marginLeft: 'auto',
    color: '#074EE8',
  },
  nextButton: {
    margin: '1rem auto',
  },
  totalFooter: {
    margin: '20px',
  },
  dotted: {
    margin: 'auto',
    marginTop: '5%',
    marginBottom: '5%',
    width: '90%',
    borderTop: '#1c1b1b 2px dashed',
  },
  copyShareLinkButton: {
    margin: '.5rem auto',
    textAlign: 'center',
  },
  shareLink: {
    margin: '1rem auto',
    overflow: 'auto',
  },
  modalBody: {
    margin: '1rem',
  },
  shareModalButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStyles;
