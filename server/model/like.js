const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostKudo',
        required: true
    },
    isLike:{
        type: Boolean,
        required: true,
        default: false
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Like', likeSchema);