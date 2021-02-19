import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import Repository from '../pages/repository';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/repository/:repository+" component={Repository} />
      <Route path="/*" component={() => <h1>Page not found</h1>} />
    </Switch>
  )
}

export default Routes;
