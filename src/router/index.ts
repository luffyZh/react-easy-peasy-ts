import { BarChartOutlined, UserOutlined, LineChartOutlined } from '@ant-design/icons';
import Cookie from 'js-cookie';
import BasicLayout from 'src/layouts/BasicLayout';
import Header from 'src/components/Header';
import Login from 'src/pages/login';
import Account from 'src/pages/account';
import OutVendor from 'src/pages/out-vendor';
import InnerPanel from 'src/pages/inner-panel';
import NotFound from 'src/pages/not-found';
import { Roles } from 'src/constants/ConstTypes';
import { IRouteNode } from 'src/interfaces';

const administrator = Roles.数据分析师 === Number(Cookie.get('MARKET_LANCHDATA_PLATFORM_ROLE'));

// ! 始终保证准确路径在前
export const router: IRouteNode[] = [
  // 登录页 Layout
  {
    path: '/login',
    name: '登录',
    component: Login,
  },
  {
    path: '/notFound',
    component: NotFound,
  },
  {
    path: '/',
    name: '首页',
    component: BasicLayout,
    child: Header,
    layout: true, // 是否是 layout 布局
    routes: [
      {
        path: '/innerPanel',
        name: '内部看板',
        icon: BarChartOutlined,
        component: InnerPanel,
      },
      {
        path: '/outVendor',
        name: '外部看板',
        icon: LineChartOutlined,
        component: OutVendor,
      },
      {
        path: '/account',
        name: '账号中心',
        icon: UserOutlined,
        component: Account,
        authority: administrator,
        style: { position: 'absolute', bottom: 60 },
      },
      {
        path: '/',
        exact: true,
        redirect: window.location.pathname === '/' ? '/innerPanel' : '/notFound',
        hideInMenu: true,
      },
    ],
  },
];
