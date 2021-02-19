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
  button: {
    margin: theme.spacing(1),
    width: '100%',
  },
  buttonContainer: {
    display: 'block',
    padding: '20%',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    paddingBottom: '20%',
  },
}));

export default useStyles;
