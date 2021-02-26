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
    color: '#078080',
  },
  backIconButton: {
    marginRight: theme.spacing(3),
    color: '#078080',
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
