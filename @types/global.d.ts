/* eslint-disable @typescript-eslint/interface-name-prefix, @typescript-eslint/array-type */
declare interface Window {
  config: {
    version: string;
    systemName: string;
    publicKey: string;
    requestList: any[];
  };
}

/**
 * 解决 PromisConstructor 不支持 Promise
 */
declare interface PromiseConstructor {
  allSettled(promises: Array<Promise<any>>): Promise<Array<any>>;
}

declare interface IResponseCustom extends Response {
  statusCode: number; // Response 里面只有 status，并没有 status code
  message: string;
  abort: any;
  url: string;
}
declare interface IResponseBody<T> {
  data: T;
  error_code: number;
  error_message: string;
}

/**
 * 自定义的 AbortController 除了最基本的属性外还包括
 * url: 请求的链接
 * group: 请求所在的页面
 */
declare interface IAbortControllerCustom extends AbortController {
  url?: string; // 给 requestController 绑定 url，用来判断前后 controller 是否重复
  group?: string; // 给 requestConroller 绑定 域名，切换路由的时候把不同域名的 controller 移除
}

/**
 * 组件不知道传什么，就用这个。比如，根组件，路由组件等
 */
declare interface IComponentProps {
  [key: string]: any;
}

/**
 * 全局定义 Roles
 */
declare enum Roles {
  数据分析师 = 1,
  市场主管 = 2,
  代理商 = 3,
  市场投放 = 4,
  产品推广负责人 = 5,
  '学科-产品推广' = 6,
}
