import React, { useState, memo } from 'react';
import { Link, Redirect, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Tooltip, message } from 'antd';
import _ from 'lodash';
import { useUpdateEffect } from 'react-use';
import { useStoreState } from 'src/state/hooks';
import { Logo } from 'src/constants/Images';
import { IRouteNode, IBasicLayoutProps } from 'src/interfaces';
import { clearRequestController } from 'src/utils/methods';
import styles from './BasicLayout.module.scss';

const { Header, Sider, Content } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

function renderMenu(router: IRouteNode[]) {
  return router.map(m => {
    if (typeof m.authority !== 'undefined' && !m.authority) {
      // 如果存在权限，且权限是 false 则隐藏
      return null;
    }
    // 如果是要隐藏的菜单不进行渲染
    if (m.hideInMenu) {
      return null;
    }
    const MIcon = m.icon;
    if (!_.isEmpty(m.routes)) {
      return (
        <SubMenu
          key={m.path}
          title={
            <span>
              {MIcon && <MIcon />}
              <span>{m.name}</span>
            </span>
          }
        >
          {renderMenu(m.routes!)}
        </SubMenu>
      );
    }

    return (
      <MenuItem style={m.style} key={m.path}>
        {MIcon && <MIcon />}
        <span>{m.name}</span>
      </MenuItem>
    );
  });
}

function renderRoute(router: IRouteNode[]): any[] {
  return router.map(m => {
    if (typeof m.authority !== 'undefined' && !m.authority) {
      // 如果存在权限，且权限是 false 则隐藏
      return null;
    }
    if (!_.isEmpty(m.routes)) {
      return renderRoute(m.routes!);
    }

    const { redirect, path, component } = m;

    return (
      <Route
        key={path}
        path={path}
        // authority={authority}
        render={props => (redirect ? <Redirect to={redirect} /> : component && React.createElement(component, props))}
      />
    );
  });
}

function BasicLayout({
  router,
  /**
   * 经过 react-router-dom 的 Route 包裹过后，history，location 等属性就自动传入到组建 props 中
   */
  history,
  location: { pathname },
  child,
}: IBasicLayoutProps) {
  const paths = _.dropRight(pathname.split('/'), 1);
  const openKeys = paths.map((m, i) => _.take(paths, i + 1).join('/'));
  const [collapsed, setCollapsed] = useState(false);

  const isLoggedIn = useStoreState(state => state.userModel.isLoggedIn);

  if (!isLoggedIn) {
    // 未登录，跳转至登录页
    message.warning('登录已失效，请重新登录', 1, () => {
      history.push('/login');
    });
  }

  useUpdateEffect(() => {
    clearRequestController();
  }, [pathname]);

  const onCollapse = (flag: boolean) => {
    setCollapsed(flag);
  };

  return (
    <Layout>
      <Sider collapsible width={220} collapsed={collapsed} onCollapse={onCollapse}>
        <Link to="/outVendor">
          <div className={styles.logo}>
            <Tooltip placement="right" title={window.config.systemName}>
              <img alt="logo" src={Logo} style={{ marginRight: collapsed ? 0 : '' }} />
            </Tooltip>
            {!collapsed && window.config.systemName}
          </div>
        </Link>
        {pathname !== '/' && (
          <Menu
            mode="inline"
            defaultOpenKeys={openKeys}
            selectedKeys={[!pathname.includes('/account') ? pathname : '/account']}
            onClick={({ key }) => {
              if (key === '/account') {
                history.push('/account/list');
              }
            }}
            onSelect={param => {
              history.push(param.key);
            }}
          >
            {renderMenu(router)}
          </Menu>
        )}
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>{React.createElement(child, { history })}</Header>
        <Content style={{ overflow: 'auto' }}>
          <div style={{ margin: 10, backgroundColor: '#fff', padding: 20, borderRadius: 4 }}>
            <Switch>{_.flattenDeep(renderRoute(router))}</Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default memo(BasicLayout);
