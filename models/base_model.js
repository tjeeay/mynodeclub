'use strict';

/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */
let tools = require('../common/tools');

module.exports = schema => {
    schema.methods.create_at_ago = () => {
        return tools.formatDate(this.create_at, true);
    };

    schema.methods.update_at_ago = () => {
        return tools.formatDate(this.update_at, true);
    };
};
