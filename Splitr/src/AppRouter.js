import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Confirm from './Confirm';
import Pay from './Pay';
import Error from './Error';

/**
 * Main router for the App
 *
 * @return {object} JSX
 */
function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/confirm" component={Confirm} />
        <Route path="/pay" component={Pay} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
