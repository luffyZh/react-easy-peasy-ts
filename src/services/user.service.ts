import Api from 'src/constants/Api';
import request from 'src/utils/request';

/**
 * 登录
 * @method POST
 * @param opts
 */
export const loginUser = opts => request<any>(Api.POST_LOGIN, opts);
/**
 * 获取用户列表
 * @method GET
 */
export const getUserList = opts => request<any>(Api.GET_USER_LIST, opts);
