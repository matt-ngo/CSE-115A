import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
  },
  brandHeader: {
    display: 'flex',
    textAlign: 'left',
    // color: '#078080',
    padding: '20px',
    paddingLeft: '0',
    // color: '#074EE8', //blue
  },
  h1: {
    // fontFamily: '"Baloo Thambi 2", sans-serif',
    fontWeight: '700',
    fontSize: '30px',
  },
  alert: {
    'width': '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
    padding: '10px',
    width: '100%',
    // border: '4px solid #232323',
  },
  paper: {
    width: 'auto',
    minHeight: '200px',
    marginBottom: '1rem',
    // boxShadow: '7px 8px 15px grey',
    boxShadow: '9px 9px 0px grey',
    border: '4px solid #232323',
  },
  buttonContainer: {
    display: 'block',
    padding: '15%',
    // paddingTop: '20%',
    textAlign: 'center',
  },
  imageitem: {
    contentAlign: 'center',
    textAlign: 'center',
  },
}));

export default useStyles;
