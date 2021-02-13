import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import {Button, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';

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
