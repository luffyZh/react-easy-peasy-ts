import qs from 'query-string';
import Cookie from 'js-cookie';
import 'whatwg-fetch';
import { requestControllerPush, requestControllerPop } from './methods';

export interface IReqInit extends RequestInit {
  headers?: Record<string, string>;
  /** eg. ?a=1 */
  query?: { [key: string]: any };
  /** eg. /:id/.. */
  params?: { [key: string]: any };
  /** 超时时间，默认 3000 */
  timeout?: number;
}

async function request<T = unknown>(path: string, options: IReqInit = {}): Promise<T> {
  /**
   * 中断请求
   */
  const controller: IAbortControllerCustom = new AbortController();
  const signal = controller.signal;
  controller.url = path.split('v1.0.0')[1];
  controller.group = window.location.pathname;

  const mergeInit = {
    ...request.default,
    ...options,
    signal,
    headers: { ...request.default.headers, ...options.headers },
  };
  const { query, params, body, timeout, headers } = mergeInit;
  // const hasType =
  //   Reflect.has(headers, 'Content-Type') ||
  //   Reflect.has(headers, 'content-type');
  let url = path;

  if (params && JSON.stringify(params) !== '{}') {
    /**
     * replace 第二个参数是字符串，也可以是返回字符串的函数
     * 一般来说，第一个正则如果使用 /g 就表示匹配所有的，否则只会替换第一次匹配的
     * 当匹配所有的时候，每一次匹配到的字符串都会当作参数传入第二个函数
     * 一般来说第二个函数只有一个参数，就是匹配到的字符
     * 此例比较特殊，因为约定是路由参数以 :key 的形式，我们匹配的是 :key，而冒号当作正常字符
     * 并不是正则的变量内容，所以第一个参数就是 :key 匹配到的内容，第二个参数就是 key，匹配到的正则变量
     */
    url = path.replace(/:([A-Za-z]+)/g, (substring, key: string) => params[key]);
  }

  if (query && JSON.stringify(query) !== '{}') {
    url += `?${qs.stringify(query)}`;
  }

  /**
   * fetch 通过 body 处理携带 post 请求
   * 设置 content-type: application/json，表示接收一个 JSON 字符串
   * 因此需要将 body 转化一下，传入的 body 是一个对象
   * 需要 JSON.stringify一下
   **/
  if (body) {
    mergeInit.body = JSON.stringify(body);
    Reflect.set(headers, 'Content-Type', 'application/json');
  }

  console.info('Request url: ', url);

  try {
    requestControllerPush(controller);
    const response: IResponseCustom = await Promise.race([
      fetch(url, mergeInit),
      new Promise<any>((resolve, reject) => {
        setTimeout(() => reject({ status: 408, statusText: 'TIME_OUT_ERR', url }), timeout);
      }),
    ]);

    if (response.ok) {
      requestControllerPop(controller);
      if (request.interceptors.response) {
        const res = await request.interceptors.response(response);
        /**
         * 除了 data 这里还有 error_code 和 error_message
         */
        const { data } = res;
        return data;
      }
      return await response.json();
    }

    throw response;
  } catch (error) {
    if (request.interceptors.catch) {
      request.interceptors.catch(error);
    }

    throw error;
  }
}

request.default = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: Cookie.get('MARKET_LANCHDATA_PLATFORM_TOKEN') || '',
    'account-id': Cookie.get('MARKET_LANCHDATA_PLATFORM_ID') || '',
  },
  mode: 'cors',
  timeout: 15000, // 默认超时时间是 15 秒
  credentials: 'include', // send cookies
} as IReqInit;

request.interceptors = {
  response: null,
  catch: null,
} as {
  response: ((response: IResponseCustom) => Promise<any>) | null;
  catch: ((error: Partial<IResponseCustom>) => void) | null;
};

export default request;
