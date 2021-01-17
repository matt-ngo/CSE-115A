import React from 'react';
// import {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// import SharedContext from './SharedContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

/**
 *
 * @return {object} JSX
 */
function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Container maxWidth="md">
        <h1>SPLITR</h1>
      </Container>
    </div>
  );
}

export default App;
