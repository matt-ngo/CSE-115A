import React, {useContext} from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import SharedContext from './SharedContext';
import useStyles from './styles/PayStyles';
import TextField from '@material-ui/core/TextField';

/**
 *
 * @return {object} JSX
 */
const Pay = () => {
  const classes = useStyles();

  const {splitAmount} = useContext(SharedContext);

  // todo: don't allow button push if user field is blank
  const [payLink, setPayLink] = useState(
      'https://venmo.com/?txn=pay&audience=friends&recipients=NoneSpecified&amount=' +
      splitAmount +
      '&note=Paid%20with%20SPLITR',
  );
  const [reqLink, setReqLink] = useState(
      'https://venmo.com/?txn=charge&audience=friends&recipients=NoneSpecified&amount=' +
      splitAmount +
      '&note=Requested%20with%20SPLITR',
  );

  const [userId, setUserId] = useState(' ');

  const handleInput = (event) => {
    setUserId(event.target.value);
    console.log(userId);
    setPayLink(
        'https://venmo.com/?txn=pay&audience=friends&recipients=' +
        userId +
        '&amount=' +
        splitAmount +
        '&note=Paid%20with%20SPLITR',
    );
    setReqLink(
        'https://venmo.com/?txn=charge&audience=friends&recipients=' +
        userId +
        '&amount=' +
        splitAmount +
        '&note=Requested%20with%20SPLITR',
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.brandHeader} maxWidth="md">
        <h1>SPLITR</h1>
      </Container>
      <Paper className={classes.paper}>
        {/* {console.log(splitAmount)} */}
        <div className={classes.buttonContainer}>
          <TextField
            id="outlined"
            label="User"
            defaultValue=" "
            helperText="@username or phone number :)"
            variant="outlined"
            className={classes.input}
            onInput={handleInput}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<CallMadeIcon />}
            href={payLink}
          >
            Pay
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<CallReceivedIcon />}
            href={reqLink}
          >
            Request
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Pay;
