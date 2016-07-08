'use strict';

let config = require('./config');


// get color and style in your node.js console
require('colors');
let path = require('path');
let express = require('express');
let Loader = require('loader');
let LoaderConnect = require('loader-connect');
let webRouter = require('./web_router');

let logger = require('./common/logger'); 
let _ = require('lodash');


let app = express();

// configuration in all env
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout';
//app.enable('trust proxy');

// 静态资源
if (config.debug) {
  app.use(LoaderConnect.less(__dirname)); // 测试环境用，编译 .less on the fly
}

// 静态文件目录
let staticDir = path.join(__dirname, 'public');
app.use('/public', express.static(staticDir));

// assets
var assets = {};
if (config.mini_assets) {
  try {
    assets = require('./assets.json');
  } catch (e) {
    logger.error('You must execute `make build` before start app when mini_assets is true.');
    throw e;
  }
}

_.extend(app.locals, {
    config: config,
    assets: assets,
    Loader: Loader
});

_.extend(app.locals, require('./common/render_helper'));
app.use(function (req, res, next) {
  res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
  next();
});

app.use('/', webRouter);

if (!module.parent) {
  app.listen(config.port, function () {
    logger.info('NodeClub listening on port', config.port);
    logger.info('God bless love....');
    logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
    logger.info('');
  });
}

module.exports = app;