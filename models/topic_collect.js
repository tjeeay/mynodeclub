'use strict';

let mongoose = require('mongoose');
let BaseModel = require("./base_model");
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let TopicCollectSchema = new Schema({
    user_id: { type: ObjectId },
    topic_id: { type: ObjectId },
    create_at: { type: Date, default: Date.now }
});

TopicCollectSchema.plugin(BaseModel);
TopicCollectSchema.index({ user_id: 1, topic_id: 1 }, { unique: true });

mongoose.model('TopicCollect', TopicCollectSchema);
