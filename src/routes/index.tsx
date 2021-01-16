import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Splash from '../pages/Splash'
import Main from '../pages/Main'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Splash} />
      <Route path="/Main" exact component={Main} />
    </Switch>
  );
};

export default Routes;