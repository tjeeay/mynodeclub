let config = require('../config');
let log4js = require('log4js');

let env = process.env.NODE_ENV || "development"

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'logs/mylog.log', category: 'mylog' }
    ]
});
// or
//log4js.configure('log4js.json', { cwd: '../config' });


let logger = log4js.getLogger('mylog');
// 设置日志级别
logger.setLevel((config.debug && env !== 'test') ? 'DEBUG' : 'ERROR');

module.exports = logger;