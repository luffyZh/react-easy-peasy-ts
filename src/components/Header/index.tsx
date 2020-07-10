import React from 'react';
import { Dropdown, Menu, Avatar, Breadcrumb, message } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import Cookie from 'js-cookie';
import { useStoreState } from 'src/state/hooks';
import { RoutePathName } from 'src/constants/ConstTypes';
import { UserLogo } from 'src/constants/Images';
import styles from './index.module.scss';

const { Item } = Menu;
const BreadcrumbItem = Breadcrumb.Item;

interface IHomeHeaderProps {
  [key: string]: any;
}

/**
 * 退出登录
 */
function logout() {
  Cookie.remove('MARKET_LANCHDATA_PLATFORM_MOBILE');
  Cookie.remove('MARKET_LANCHDATA_PLATFORM_ID');
  Cookie.remove('MARKET_LANCHDATA_PLATFORM_ROLE');
  Cookie.remove('MARKET_LANCHDATA_PLATFORM_TOKEN');
}

function Header(props: IHomeHeaderProps) {
  const {
    history: {
      location: { pathname },
    },
  } = props;

  const { user } = useStoreState(state => state.userModel);

  return (
    <div className={styles.wrap}>
      {(RoutePathName[pathname] && (
        <Breadcrumb separator=">">
          {RoutePathName[pathname].map(item =>
            item.href ? (
              <BreadcrumbItem href={item.href} key={item.title}>
                {item.title}
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem key={item.title}>
                <span id="header_second_tab">{item.title}</span>
              </BreadcrumbItem>
            ),
          )}
        </Breadcrumb>
      )) || <span style={{ display: 'inline-block', width: 1 }} />}
      <Dropdown
        className={styles.pop}
        overlay={
          <Menu>
            <Item>
              <span
                className={styles.menu_item}
                onClick={() => {
                  logout();
                  message.success('退出登录成功', 1, () => (window.location.href = '/login'));
                }}
              >
                <PoweroffOutlined />
                <span>退出登录</span>
              </span>
            </Item>
          </Menu>
        }
      >
        <div className={styles.pop_trigger}>
          <Avatar src={UserLogo} />
          <span className={styles.user_name}>{user && user.accountName}</span>
        </div>
      </Dropdown>
    </div>
  );
}

export default Header;
