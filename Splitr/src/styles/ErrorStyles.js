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
  },
  errorMessage: {
    textAlign: 'center',
    padding: '1rem',
  },
  homeButton: {
    margin: '1rem auto',
  },
}));

export default useStyles;
