import { RouteComponentProps, RouteProps } from 'react-router-dom';

export interface IRouteNode {
  path: string;
  name?: string;
  /** 重定向不能与布局组件同时使用，同时使用时会忽略重定向（可以通过布局组件内部处理解决） */
  redirect?: string;
  /** 菜单布局组件会使用 */
  hideInMenu?: boolean;
  /** 是否是布局组件（默认 `false`）  */
  layout?: boolean;
  /** 当 `layout` 为 `true` 时，该组件会作为布局组件，接收 `router` (routes 别名) 及其它属性值，*/
  component?: React.ComponentType<any>;
  routes?: IRouteNode[];
  /** 授权，可以后续扩展，本系统权限比较简单，因此不需要，如果是博客类，可以使用 */
  authority?: any;
  /* 特殊样式，比如至底部 */
  style?: object;
  /** 预留自定义属性 */
  [otherProp: string]: any;
}

export interface IRouterProps {
  router: IRouteNode[];
}

export type IRouterLayoutType = IRouterProps & RouteComponentProps;

export interface IPrivateRouteProps extends RouteProps {
  authority?: any;
}

export interface IBasicLayoutProps extends IRouterLayoutType {
  child: React.ComponentType<any>;
}
