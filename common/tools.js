let moment = require('moment');

moment.locale('zh-cn'); // 使用中文

/**
 * 格式化时间
 */
exports.formatDate = function (date, friendly) {
    date = moment(date);
    if (friendly) {
        return date.fromNow();  // 友好显示，比如：2 分钟前
    } else {
        return date.format('YYYY-MM-DD HH:mm');
    }
}