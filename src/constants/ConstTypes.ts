import moment, { Moment } from 'moment';

export const Roles = {
  /** 游客 */
  数据分析师: 1,
  市场主管: 2,
  代理商: 3,
  市场投放: 4,
  产品推广负责人: 5,
  '学科-产品推广': 6,
};

export const RoutePathName: object = {
  '/': [{ title: '首页' }],
  '/login': [{ title: '登录' }],
  '/innerPanel': [{ title: '内部看板' }],
  '/outVendor': [{ title: '外部看板' }],
  '/account/list': [{ title: '账号中心', href: '/account/list' }, { title: '账号列表' }],
  '/account/new': [{ title: '账号中心', href: '/account/list' }, { title: '创建账户' }],
};

export const RequestStatus: object = {
  initial: 'initial',
  requesting: 'requesting',
  success: 'success',
  fail: 'fail',
};

export const PageSizeOptions: string[] = ['50', '100', '200', '500', '1000'];

/**
 * 日期选择控件的short cut
 */
const today: Moment = moment();
const yesterday: Moment = moment().subtract(1, 'days');
export const DatePickerRanges: Record<string, [Moment, Moment]> = {
  昨天: [
    moment()
      .subtract(1, 'days')
      .startOf('day'),
    moment()
      .subtract(1, 'days')
      .endOf('day'),
  ],
  过去7天: [moment().subtract(7, 'days'), yesterday],
  过去30天: [moment().subtract(30, 'days'), yesterday],
  本月: [moment().startOf('month'), today],
  上个月: [
    moment()
      .startOf('month')
      .subtract(1, 'month'),
    moment()
      .endOf('month')
      .subtract(1, 'month'),
  ],
};

export function DisabledDate(current) {
  // Can not select days before today and today
  return current && current > moment().endOf('day');
}

export const InnerDataIndicatorCoumluns = [
  /* 基础列指标 */
  {
    group: 'basic',
    key: 'project',
    title: '课程项目',
  },
  {
    group: 'basic',
    key: 'subject',
    title: '学科',
  },
  {
    group: 'basic',
    key: 'grade',
    title: '年级',
  },
  {
    group: 'basic',
    key: 'channel',
    title: '渠道',
  },
  {
    group: 'basic',
    key: 'course_id',
    title: '课程ID',
  },
  {
    group: 'basic',
    key: 'class_begin_date',
    title: '开课日期',
  },
  // {
  //   group: 'basic',
  //   key: 'order_date',
  //   title: '成单日期',
  // },
  {
    group: 'basic',
    key: 'owner',
    title: '投放人',
  },
  {
    group: 'basic',
    key: 'category_name',
    title: '投放项目',
  },
  {
    group: 'basic',
    key: 'agent',
    title: '代理商',
  },
  // {
  //   group: 'basic',
  //   key: 'city_level',
  //   title: '城市级别',
  // },
  // {
  //   group: 'basic',
  //   key: 'city_name',
  //   title: '城市名',
  // },
  /* 数据列指标 */
  {
    group: 'data',
    key: 'order_num',
    title: '成单数',
  },
  {
    group: 'data',
    key: 'user_num',
    title: '用户数',
  },
  {
    group: 'data',
    key: 'new_user_num',
    title: '新用户数',
  },
  {
    group: 'data',
    key: 'touch_rate',
    title: '触达率',
  },
  {
    group: 'data',
    key: 'valid_rate',
    title: '有效率',
  },
  {
    group: 'data',
    key: 'invalid_rate',
    title: '无效率',
  },
  {
    group: 'data',
    key: 'strong_intention_rate',
    title: '强意向比例',
  },
  {
    group: 'data',
    key: 'pull_new_user_rate',
    title: '强意向占比',
  },
  {
    group: 'data',
    key: 'cost',
    title: '花费（单位元）',
  },
  {
    group: 'data',
    key: 'income',
    title: '收入（单位元）',
  },
  {
    group: 'data',
    key: 'subject_income_rate',
    title: '本学科收入占比',
  },
  {
    group: 'data',
    key: 'per_new_user_cost',
    title: '新用户成本',
  },
  {
    group: 'data',
    key: 'attend_user_num',
    title: '出勤用户数',
  },
  {
    group: 'data',
    key: 'attend_user_rate',
    title: '出勤率',
  },
  {
    group: 'data',
    key: 'attend_livestream_user_num',
    title: '直播出勤数',
  },
  {
    group: 'data',
    key: 'attend_livestream_user_rate',
    title: '直播出勤率',
  },
  {
    group: 'data',
    key: 'attend_livestream_new_user_num',
    title: '直播出勤新用户数',
  },
  {
    group: 'data',
    key: 'attend_livestream_new_user_rate',
    title: '直播出勤新用户率',
  },
  {
    group: 'data',
    key: 'convert_new_user_num',
    title: '新用户转化人数',
  },
  {
    group: 'data',
    key: 'convert_new_user_rate',
    title: '新用户转化率',
  },
  {
    group: 'data',
    key: 'conver_attend_new_user_num',
    title: '新用户出勤转化人数',
  },
  {
    group: 'data',
    key: 'convert_attend_new_user_rate',
    title: '新用户出勤转化率',
  },
  {
    group: 'data',
    key: 'conver_attend_livestream_new_user_num',
    title: '新用户直播出勤转化人数',
  },
  {
    group: 'data',
    key: 'conver_attend_livestream_new_user_rate',
    title: '新用户直播出勤转化率',
  },
  {
    group: 'data',
    key: 'e_covert_rate',
    title: 'E转化率',
  },
  {
    group: 'data',
    key: 'e_roi',
    title: 'EROI',
  },
  {
    group: 'data',
    key: 'e_1_convert_rate',
    title: 'E+1转化率',
  },
  {
    group: 'data',
    key: 'e_1_roi',
    title: 'E+1ROI',
  },
  {
    group: 'data',
    key: 'e_7_convert_rate',
    title: 'E+7转化率',
  },
  {
    group: 'data',
    key: 'e_7_roi',
    title: 'E+7ROI',
  },
  {
    group: 'data',
    key: 'e_30_convert_rate',
    title: 'E+30转化率',
  },
  {
    group: 'data',
    key: 'e_30_roi',
    title: 'E+30ROI',
  },
  {
    group: 'data',
    key: 'e_latest_convert_rate',
    title: 'E+最新转化率',
  },
  {
    group: 'data',
    key: 'e_latest_roi',
    title: 'E+最新ROI',
  },
];

// 默认的汇总数据
export const DefaultTotalData = InnerDataIndicatorCoumluns.reduce((acc, cur) => {
  cur.group === 'data' ? (acc[cur.key] = 0) : (acc[cur.key] = '--');
  return acc;
}, {});

// 默认的列
export const DefaultColumnKeys = InnerDataIndicatorCoumluns.map(i => i.key);

// 需要隐藏地域的字段
export const HideAreaColumnKeys = ['cost', 'per_new_user_cost', 'e_roi', 'e_1_roi', 'e_7_roi', 'e_30_roi', 'e_latest_roi'];
