import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';

// import SharedContext from './SharedContext';

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
}));

/**
 *
 * @return {object} JSX
 */
const Pay = () => {
  const classes = useStyles();

  // const {} = useContext(SharedContext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.brandHeader} maxWidth="md">
        <h1>SPLITR</h1>
      </Container>
      <Paper className={classes.paper}>
        <h1>Payment stuff goes here</h1>
      </Paper>
    </div>
  );
};

export default Pay;
