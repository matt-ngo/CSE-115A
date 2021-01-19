import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Confirm from './Confirm';

/**
 * Main router for the App
 *
 * @return {object} JSX
 */
function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/confirm" component={Confirm}/>
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
