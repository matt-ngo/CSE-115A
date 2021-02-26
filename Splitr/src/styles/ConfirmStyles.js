import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    maxWidth: '450px',
    margin: 'auto',
    padding: '20px',
  },
  brandHeader: {
    display: 'flex',
    alignItems: 'center',
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
  backIconButton: {
    marginRight: theme.spacing(3),
    color: '#074EE8',
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
