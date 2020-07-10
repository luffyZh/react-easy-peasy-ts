const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/* 分析开启 bundle-analyzer */
const IS_ANALYSE = process.argv.includes('--analyse');

/* 分析是不是生产环境，如果是生产环境移除 console */
const IS_ONLINE = process.argv.includes('--online');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  fixBabelImports('lodash', {
    libraryDirectory: '',
    camel2DashComponentName: false,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#53B364',
      '@error-color': '#FF6E32',
      '@border-radius-base': '8px',
    },
  }),
  IS_ANALYSE ? addWebpackPlugin(new BundleAnalyzerPlugin()) : undefined,
  config => {
    if (IS_ONLINE) {
      // 上线的时候移除 console
      config.optimization.minimizer[0].options.terserOptions.compress['drop_console'] = true;
    }
    return config;
  },
);
