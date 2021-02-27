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
    padding: '20px',
    paddingLeft: '0',
  },
  h1: {
    // fontFamily: '"Baloo Thambi 2", sans-serif',
    fontWeight: '700',
    fontSize: '30px',
  },
  backIconButton: {
    marginRight: theme.spacing(3),
    color: '#232323',
  },
  paper: {
    width: 'auto',
    boxShadow: '9px 9px 0px grey',
    border: '4px solid #232323',
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
  msgContainer: {
    display: 'block',
    padding: '15%',
    paddingTop: '30%',
    paddingBottom: '30%',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    paddingBottom: '20%',
  },
}));

export default useStyles;
