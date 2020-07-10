import { action, computed, thunk, actionOn } from 'easy-peasy';
import Cookie from 'js-cookie';
import { message } from 'antd';
import { IUserModel } from 'src/interfaces';
import { Roles } from 'src/constants/ConstTypes';
import { getUserList } from 'src/services/user.service';

function saveUserCookie(user) {
  Cookie.set('MARKET_LANCHDATA_PLATFORM_MOBILE', user.mobile, { expires: 7 });
  Cookie.set('MARKET_LANCHDATA_PLATFORM_ID', user.accountId, { expires: 7 });
  Cookie.set('MARKET_LANCHDATA_PLATFORM_NAME', user.accountName, { expires: 7 });
  Cookie.set('MARKET_LANCHDATA_PLATFORM_TOKEN', user.token, { expires: 7 });
  Cookie.set('MARKET_LANCHDATA_PLATFORM_ROLE', user.role, { expires: 7 });
}

const DefaultUser = {
  mobile: '13344445555',
  accountId: '26',
  accountName: 'luffyZh',
  token: 'xxxxx',
  role: Roles.数据分析师,
};

export const userModel: IUserModel = {
  // 当前用户
  user: null,
  // 是否是登录状态
  isLoggedIn: computed(state => state.user !== null),
  // 是否重新获取数据
  needFetch: true,
  // 用户列表
  list: [],
  // 总数
  total: 0,
  // 新建/编辑用户内容
  userInfo: null,
  // action - 授权用户
  authUser: action((state, payload) => {
    state.user = payload;
  }),
  // action - 设置重新获取数据标志位
  setNeedFetch: action((state, payload) => {
    state.needFetch = payload;
  }),
  // action - 设置用户列表
  setList: action((state, payload) => {
    state.list = payload.list;
    state.total = payload.total;
  }),
  setUserInfo: action((state, payload) => {
    state.userInfo = payload;
  }),
  // thunk - 登录
  login: thunk(async (actions, payload) => {
    const { mobile, password } = payload;
    if (mobile === '13344445555' && password === '123456') {
      // 登录成功，存入 cookie
      await saveUserCookie(DefaultUser);
      actions.authUser({
        ...DefaultUser,
      });
      message.success('登录系统成功', 0.5, () => {
        // const redirect = sessionStorage.getItem('redirect') || '/';
        window.location.replace('/');
      });
    } else {
      message.error('用户名密码错误，请重新登录');
    }
  }),
  // thunk - 获取用户列表
  fetchUserList: thunk(async (actions, payload, { getStoreState }) => {
    actions.setNeedFetch(false);
    /**
     * 先获取到 queryCondition 的请求参数
     */
    const { queryCondition } = getStoreState().globalModel;
    const { role, mobile, name, pageNum, pageSize } = queryCondition;
    const query = {
      roleId: Number(role) === -1 ? undefined : role,
      phoneNum: mobile,
      accountName: name,
      pageNo: pageNum,
      pageCapacity: pageSize,
    };
    const opts = { query };
    const list = await getUserList(opts);
    actions.setList(list);
  }),
  // actionOn - 监听查询条件的变化
  onQueryConditionChange: actionOn(
    (actions, storeActions) => storeActions.globalModel.setQueryCondition,
    (state, target) => {
      console.log('监听到了 globalModel 的 queryCondition 变了，如果是 pageNum/pageSize 得重新获取数据');
      const { type } = target.payload;
      const needFetchType = ['pageNum', 'pageSize'];
      if (needFetchType.includes(type)) {
        state.needFetch = true;
      }
    },
  ),
};
