const mongoose = require('mongoose');

const kudosSchma = mongoose.Schema({
    kudos:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Kudos', kudosSchma);