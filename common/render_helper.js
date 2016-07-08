'use strict';

let config = require('../config');

exports.staticFile = (filePath) => {
  if (filePath.indexOf('http') === 0 || filePath.indexOf('//') === 0) {
    return filePath;
  }
  return config.site_static_host + filePath;
};
