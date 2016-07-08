'use strict';

let mongoose = require('mongoose');
let BaseModel = require("./base_model");
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let ReplySchema = new Schema({
    content: { type: String },
    topic_id: { type: ObjectId },
    author_id: { type: ObjectId },
    reply_id: { type: ObjectId },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    content_is_html: { type: Boolean },
    ups: [Schema.Types.ObjectId],
    deleted: { type: Boolean, default: false },
});

ReplySchema.plugin(BaseModel);
ReplySchema.index({ topic_id: 1 });
ReplySchema.index({ author_id: 1, create_at: -1 });

mongoose.model('Reply', ReplySchema);
