import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import New from './new';
import AccountList from './list';

export default function Account(props: IComponentProps) {
  return (
    <Switch>
      <Route exact path="/account/list" component={AccountList} />
      <Route exact path="/account/new" component={New} />
      <Redirect from="/account" to="/account/list" />
    </Switch>
  );
}
