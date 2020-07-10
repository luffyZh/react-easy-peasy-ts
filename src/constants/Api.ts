// 开发环境
const DEV_HOST = 'http://rap2.taobao.org:38080/app/mock/249056';

// 生产环境
const PROD_HOST = 'https://ke-data.youdao.com';

const BASE_HOST =
  process.env.NODE_ENV !== 'production'
    ? DEV_HOST // 开发
    : PROD_HOST; // 测试和生产改这个

const BASE_VERSION = '/v1.0.0';

const API_BASE_URL = `${BASE_HOST}${BASE_VERSION}`;

export default {
  /**
   * user account
   */
  POST_LOGIN: `${API_BASE_URL}/account/authorization`,
  GET_USER_LIST: `${API_BASE_URL}/account/list`,
};
