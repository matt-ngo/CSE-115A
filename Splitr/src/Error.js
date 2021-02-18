import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {Button, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import useStyles from './styles/ErrorStyles';

const Error = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container className={classes.brandHeader} maxWidth="md">
        <h1>SPLITR</h1>
      </Container>
      <Paper className={classes.paper}>
        <Container className={classes.errorMessage}>
          <Typography variant="body1">
            {`404: The page you're looking for doesn't exist.`}
          </Typography>
          <Button
            className={classes.homeButton}
            color="primary"
            variant="contained"
            component={Link}
            to="/"
          >
            Go to Home
          </Button>
        </Container>
      </Paper>
    </div>
  );
};

export default Error;
