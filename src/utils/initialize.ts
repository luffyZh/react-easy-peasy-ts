import { message } from 'antd';
import { nanoid } from 'nanoid';
import Cookie from 'js-cookie';
import * as Sentry from '@sentry/browser';
import request from './request';
import { authCookieUser } from './methods';
import FetchError from './FetchError';

export default function() {
  // 每次进入系统之前清除这个
  window.sessionStorage.removeItem('noAuth');
  if (!authCookieUser().auth && window.location.pathname !== '/login') {
    // sessionStorage.setItem('redirect', window.location.href);
    window.location.href = '/login';
    return;
  }

  request.interceptors.response = async function(response): Promise<IResponseBody<any>> {
    const res: IResponseBody<any> = await response.json();

    if (res.error_code === 0) {
      return res;
    } else {
      // eslint-disable-next-line
      throw {
        statusCode: res.error_code,
        statusText: res.data,
        message: res.error_message,
        url: response.url,
        res,
      };
    }
  };

  request.interceptors.catch = function(error) {
    console.log('Error: ', error);
    const err = new FetchError(error.message, {
      _traceId: nanoid(), // create your application traceId
      token: Cookie.get('MARKET_LANCHDATA_PLATFORM_TOKEN') || '',
      url: error.url,
    });
    /* config the fetch error is warning */
    Sentry.withScope(function(scope) {
      // @ts-ignore，要不然会 TS 报错
      scope.setLevel('warning');
      Sentry.captureException(err);
    });
    /**
     * 正常的 error 应该是 status 和 statusText
     * 内部系统存在很多自定义的东西，比如 statusCode 和 message,
     * 如果是请求异常，那么错误代码和错误信息是 status 和 statusText
     * 如果是请求成功，后台数据异常那么错误代码和错误信息是 statusCode 和 message，是上面的代码 throw 出来的 Error
     */
    if (error.message?.includes('aborted')) {
      console.log('用户终止了请求，啥也不干');
      return;
    }

    // 请求超时
    if (error.status === 408) {
      message.error('请求响应超时，请稍后重试');
      return;
    }

    // 无权限
    if (error.statusCode === 403003) {
      // 首页会一起 5 个请求，所以为了只弹一个，用 sessionStorage 控制一下
      if (!window.sessionStorage.getItem('noAuth')) {
        window.sessionStorage.setItem('noAuth', 'true');
        message.error('权限失效，请重新登录', 0.5, () => {
          window.location.href = '/login';
        });
      }
      return;
    }
    // message.error(`服务器错误 - ${error.status || error.statusCode}: ${error.statusText || error.message}`);
    message.error(`服务器请求错误${error.message && error.message.split(':')[1] ? ` - ${error.message.split(':')[1]}` : ''}`);
  };
}
