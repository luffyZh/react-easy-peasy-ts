import _ from 'lodash';
import moment from 'moment';
import { action } from 'easy-peasy';
import { IGlobalModel, IQueryCondition } from 'src/interfaces';

const initialQueryCondition: IQueryCondition = {
  pageNum: 1,
  pageSize: 50,
  dateRange: {
    startDate: moment().startOf('day'),
    endDate: moment(),
  },
  orderRange: {
    startDate: moment()
      .subtract(1, 'days')
      .startOf('day'),
    endDate: moment()
      .subtract(1, 'days')
      .startOf('day'),
  },
  classBeginRange: {
    startDate: moment()
      .subtract(1, 'days')
      .startOf('day'),
    endDate: moment()
      .subtract(1, 'days')
      .startOf('day'),
  },
  category: undefined,
  channel: undefined,
  agent: undefined,
  owner: undefined,
  outVendor: undefined,
  accountId: undefined,
  role: undefined,
  mobile: undefined,
  name: undefined,
  lessonId: undefined,
  grade: undefined,
  subject: undefined,
  course: undefined,
  cityLevel: undefined,
  cityName: undefined,
};

export const globalModel: IGlobalModel = {
  // 是否折叠
  collapseMenu: false,
  // 全局查询条件
  queryCondition: {
    pageNum: 1,
    pageSize: 50,
    dateRange: {
      startDate: moment().startOf('day'),
      endDate: moment(),
    },
    orderRange: {
      startDate: moment()
        .subtract(1, 'days')
        .startOf('day'),
      endDate: moment()
        .subtract(1, 'days')
        .startOf('day'),
    },
    classBeginRange: {
      startDate: moment()
        .subtract(1, 'days')
        .startOf('day'),
      endDate: moment()
        .subtract(1, 'days')
        .startOf('day'),
    },
  },
  // action - 设置折叠
  setCollapseMenu: action((state, payload) => {
    state.collapseMenu = payload;
  }),
  // action - 设置查询参数
  setQueryCondition: action((state, payload) => {
    state.queryCondition[payload.type] = payload.value;
  }),
  // action - 重置查询参数
  resetQueryCondition: action((state, payload) => {
    // @ts-ignore
    if (payload === 'inner-panel') {
      // 内部数据看板，默认值是all
      state.queryCondition = _.assign(initialQueryCondition, {
        category: 'ALL',
        channel: 'ALL',
        agent: 'ALL',
        owner: 'ALL',
        mobile: 'ALL',
        name: 'ALL',
        lessonId: 'ALL',
        grade: 'ALL',
        subject: 'ALL',
        course: 'ALL',
        cityLevel: 'ALL',
        cityName: 'ALL',
      });
    }
    state.queryCondition = initialQueryCondition;
  }),
};
