import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    maxWidth: '400px',
    margin: 'auto',
  },
  brandHeader: {
    textAlign: 'left',
    color: '#078080',
    // color: '#074EE8', //blue
  },
  alert: {
    'width': '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    width: 'auto',
    minHeight: '200px',
    marginBottom: '1rem',
  },
  buttonContainer: {
    display: 'block',
    padding: '20%',
    // paddingTop: '20%',
    textAlign: 'center',
  },
  imageitem: {
    contentAlign: 'center',
    textAlign: 'center',
  },
}));

export default useStyles;
