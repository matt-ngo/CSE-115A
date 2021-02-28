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
    color: '#074EE8',
  },
  h1: {
    fontFamily: '"Pacifico", sans-serif',
    textTransform: 'lowercase',
    fontSize: '40px',
  },
  backIconButton: {
    marginRight: theme.spacing(3),
    color: '#232323',
    // color: '#074EE8',
    transform: 'scale(1.2)',
  },
  paper: {
    width: 'auto',
    boxShadow: '9px 9px 0px grey',
    border: '5px solid #232323',
    borderRadius: '10px',
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  openBtn: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  msg2: {
    marginTop: theme.spacing(2),
    color: '#6C6C6C',
    fontSize: '12px',
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
    paddingBottom: '5%',
  },
}));

export default useStyles;
