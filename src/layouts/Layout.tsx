import React, { memo } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import { useStoreActions } from 'src/state/hooks';
import { authCookieUser } from 'src/utils/methods';
import { IRouterProps } from 'src/interfaces';

function Layout({ router }: IRouterProps) {
  const authUser = useStoreActions(actions => actions.userModel.authUser);
  const { auth, user } = authCookieUser();
  auth && authUser(user);
  return (
    <Router>
      <Switch>
        {router.map(({ path, routes, layout, component, redirect, ...otherProps }) => {
          if (layout && !_.isEmpty(routes) && component) {
            // 如果是 layout 布局，要单独处理一下，因为还有子组件
            return (
              <Route
                key={path}
                path={path}
                render={props =>
                  React.createElement(component, {
                    // 如果是 layout 布局，把渲染组件 routes 当作 router 组件继续渲染
                    router: routes,
                    ...otherProps,
                    ...props,
                  })
                }
                {...otherProps}
              />
            );
          }

          return (
            <Route
              key={path}
              path={path}
              render={props => (redirect ? <Redirect to={redirect} /> : component && React.createElement(component, props))}
              {...otherProps}
            />
          );
        })}
      </Switch>
    </Router>
  );
}

export default memo(Layout);
