import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { StoreProvider } from 'easy-peasy';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import initialize from 'src/utils/initialize';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { store } from 'src/state/store';
import { router } from 'src/router';
import Layout from 'src/layouts/Layout';
import * as serviceWorker from './serviceWorker';
import './assets/global.css';

/* 初始化拦截错误请求 */
initialize();

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <StoreProvider store={store}>
      <ErrorBoundary>
        <Layout router={router} />
      </ErrorBoundary>
    </StoreProvider>
  </ConfigProvider>,
  document.getElementById('root'),
);

/**
 * 不用 serviceWorker，如果使用把 unregister 改成 register 就行了
 */
serviceWorker.unregister();
