import React, {useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import Paper from '@material-ui/core/Paper';
import SharedContext from './SharedContext';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles/PayStyles';

const userRe = /^([a-zA-Z][a-zA-Z0-9\_\-]*)+$/g;

/**
 *
 * @return {object} JSX
 */
function Pay() {
  const classes = useStyles();
  const history = useHistory();

  const {splitAmount} = useContext(SharedContext);

  // todo: don't allow button push if user field is blank
  // web = https://venmo.com/
  // direct = venmo://paycharge
  const [payLink, setPayLink] = useState(
      'venmo://paycharge?txn=pay&audience=friends&recipients=NoneSpecified&amount=' +
      splitAmount +
      '&note=Paid%20with%20SPLITR',
  );
  const [reqLink, setReqLink] = useState(
      'venmo://paycharge?txn=charge&audience=friends&recipients=NoneSpecified&amount=' +
      splitAmount +
      '&note=Requested%20with%20SPLITR',
  );
  const defaultLink =
    'venmo://paycharge?audience=friends&recipients=&amount=' +
    splitAmount +
    '&note=Sent%20with%20SPLITR';

  const [userId, setUserId] = useState('');
  const [isUserValid, setIsUserValid] = useState(true);

  const userRegex = new RegExp(userRe); // reg exp for username field

  const handleInput = () => {
    setPayLink(
        'venmo://paycharge?txn=pay&audience=friends&recipients=' +
        userId +
        '&amount=' +
        splitAmount +
        '&note=Paid%20with%20SPLITR',
    );
    setReqLink(
        'venmo://paycharge?txn=charge&audience=friends&recipients=' +
        userId +
        '&amount=' +
        splitAmount +
        '&note=Requested%20with%20SPLITR',
    );
  };

  const onUserFieldChange = (event) => {
    if (userRegex.test(event.target.value)) {
      setIsUserValid(true);
    } else {
      setIsUserValid(false);
    }
    setUserId(event.target.value);
  };

  useEffect(() => {
    handleInput();
  }, [userId]);

  const onBackButtonClick = () => {
    history.push('/confirm');
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const defaultUserText = '@username or phone number :)';
  const errorUserText = 'Usernames must start with ' +
                        'letters and contain only letters, ' +
                        'numbers, hyphens(-), and underscores(_).' +
                        'It must be between 5-30 characters long.';

  const mobileContent = (
    <div className={classes.buttonContainer}>
      <TextField
        id="outlined"
        label="User"
        helperText={isUserValid ? defaultUserText : errorUserText}
        variant="outlined"
        className={classes.input}
        onChange={onUserFieldChange}
        value={userId}
        error={isUserValid ? false : true}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        endIcon={<CallMadeIcon />}
        href={payLink}
        target="_blank"
        disabled={isUserValid ? false : true}
      >
        Pay {`$${splitAmount.toFixed(2)}`}
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        endIcon={<CallReceivedIcon />}
        href={reqLink}
        target="_blank"
        disabled={isUserValid ? false : true}
      >
        Request {`$${splitAmount.toFixed(2)}`}
      </Button>

      <Typography variant="subtitle2" className={classes.msg2}>
        Don&apos;t know their username? Browse your friends in app!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.openBtn}
        endIcon={<LaunchIcon />}
        href={defaultLink}
        target="_blank"
      >
        Open In App
      </Button>
    </div>
  );

  const desktopContent = (
    <div className={classes.msgContainer}>
      <Typography variant="subtitle1" className={classes.msg}>
        Our sensors indicate you&apos;re using SPLITR on desktop!
        <br></br> <br></br>
        To use our Venmo integration, use SPLITR on your mobile device :)
        <br></br> <br></br>
      </Typography>

      <Typography variant="h6">Your Split:</Typography>
      <Typography variant="h6" style={{paddingTop: '3%'}}>
        {`$${splitAmount.toFixed(2)}`}
      </Typography>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.brandHeader} maxWidth="md">
        <IconButton
          className={classes.backIconButton}
          edge="start"
          onClick={onBackButtonClick}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h1" className={classes.h1}>
          SPLITR
        </Typography>
      </Container>

      <Paper className={classes.paper}>
        {matches ? desktopContent : mobileContent}
      </Paper>
    </div>
  );
}

export default Pay;
