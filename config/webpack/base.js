const {webpackConfig, merge} = require('@rails/webpacker');
const customConfig = require('./alias');

const exportConfig = merge(customConfig, webpackConfig);
module.exports = exportConfig;
