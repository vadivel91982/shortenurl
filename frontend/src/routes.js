import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as Containers from './containers';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Containers.Shorten} />
        <Route path="/stats" component={Containers.Stats} />
        <Route path="/:urlCode" component={Containers.RedirectShorten} />
        <Redirect from="*" to="/" />
    </Switch>
);

export default Routes;