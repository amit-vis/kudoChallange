const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    reason:{
        type: String,
        required: true
    },
    fromUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    kudo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kudos',
        required: true
    },
    like:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('PostKudo', postSchema);