import { Action, Thunk, Computed, ActionOn } from 'easy-peasy';
import { Moment } from 'moment';

export interface IDateRange {
  startDate: Moment | null;
  endDate: Moment | null;
}

interface IQueryConditionPayload {
  type: string;
  value: any;
}

export interface IQueryCondition {
  pageNum: number;
  pageSize: number;
  dateRange: IDateRange;
  [propsName: string]: any;
}

export interface IGlobalModel {
  collapseMenu: boolean;
  setCollapseMenu: Action<IGlobalModel, boolean>;
  queryCondition: IQueryCondition;
  setQueryCondition: Action<IGlobalModel, IQueryConditionPayload>;
  resetQueryCondition: Action<IGlobalModel, string>;
}

interface ILoginUser {
  mobile: string;
  password: string;
}

export interface IUserInfo {
  mobile: string | undefined;
  accountId: string | undefined;
  accountName: string | undefined;
  role?: Roles | undefined;
  token: string | undefined;
}

export interface IUserItem {
  accountId: number;
  accountName: string;
  role: Roles;
  phoneNum: string;
  createTime: string;
}

export interface IUserForm {
  accountId?: string | number;
  accountName: string;
  phoneNum: string;
  password: string;
  roleId: Roles;
  agentParams?: string;
  promotionParams?: string;
  categorySubject?: string;
}

export interface IUserModel {
  user: IUserInfo | null;
  list: IUserItem[];
  needFetch: boolean;
  total: number;
  userInfo: any;
  isLoggedIn: Computed<IUserModel, boolean>;
  authUser: Action<IUserModel, IUserInfo>;
  setList: Action<IUserModel, any>;
  setNeedFetch: Action<IUserModel, boolean>;
  setUserInfo: Action<IUserModel, any>;
  login: Thunk<IUserModel, ILoginUser>;
  fetchUserList: Thunk<IUserModel, any, any, IStoreModel>;
  onQueryConditionChange: ActionOn<IOutVendorModel, IStoreModel>;
}

interface IOutVendorItem {
  outVendor: string;
  category: string;
  channel: string;
  coursesOrders: number;
  newUsers: number;
  [propName: string]: any;
}

export interface IFilterData {
  categories: string[];
  channels: any[]; // channels 可能会出现 null
  owners: string[];
  agents: string[];
}

export interface IOutVendorModel {
  list: IOutVendorItem[];
  total: number;
  needFetch: boolean;
  dataNewTime: string;
  totalData: IOutVendorItem;
  filterData: IFilterData;
  setOutVendorData: Action<IOutVendorModel, any>;
  setNeedFetch: Action<IOutVendorModel, boolean>;
  setFilterData: Action<IOutVendorModel, IFilterData>;
  // 分别对应 state payload injection StoreModel，更详细查看 easy peasy TS 文档
  fetchOutVendorList: Thunk<IOutVendorModel, any, any, IStoreModel>;
  fetchFilterData: Thunk<IOutVendorModel>;
  onQueryConditionChange: ActionOn<IOutVendorModel, IStoreModel>;
}

interface ICityName {
  name: string;
  subs: string[];
}

export interface IInnerPanelFilterData {
  categories: string[];
  channels: any[]; // channels 可能会出现 null
  owners: string[];
  agents: string[];
  grades: string[];
  cityLevels: string[];
  cityNames: ICityName[];
  subjects: string[];
  courses: string[];
}

export interface IService {
  avatar: string;
  callNo: number;
  createdAt: string;
  desc: string;
  disabled: boolean;
  href: string;
  key: number;
  name: string;
  owner: string;
  progress: number;
  status: number;
  title: string;
  updatedAt: string;
}

export interface IServiceFilter {
  name: string;
  updateDate: string;
  page: number;
  pageSize: number;
}

export interface IStoreModel {
  globalModel: IGlobalModel;
  userModel: IUserModel;
}
